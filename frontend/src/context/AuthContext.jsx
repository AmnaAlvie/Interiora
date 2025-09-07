import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOAD_USER: 'LOAD_USER'
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.SIGNUP_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    
    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    
    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Base API URL
const API_BASE_URL = 'http://localhost:5000/api';

// Set up axios defaults
axios.defaults.baseURL = API_BASE_URL;

// Add request/response interceptors for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url, 'with data:', config.data);
    return config;
  },
  (error) => {
    console.log('Request error:', error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.log('Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load current user
  const loadUser = useCallback(async () => {
    try {
      const response = await axios.get('/auth/me');
      dispatch({ 
        type: AUTH_ACTIONS.LOAD_USER, 
        payload: response.data.user 
      });
    } catch (error) {
      console.error('Error loading user:', error);
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  }, []);

  // Set auth token in axios headers
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Load user on app start if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  }, []); // Only run once on mount

  // Login function
  const login = async (email, password) => {
    try {
      console.log('Login attempt with:', email);
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const response = await axios.post('/auth/login', { email, password });
      console.log('Login success:', response.data);
      
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_SUCCESS, 
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.log('Login error:', error);
      console.log('Error response:', error.response);
      const errorMessage = error.response?.data?.message || 'Login failed';
      console.log('Setting error message:', errorMessage);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const response = await axios.post('/auth/signup', { name, email, password });
      
      // Don't automatically log in the user, just return success
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  }, []);

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('/auth/profile', userData);
      dispatch({ 
        type: AUTH_ACTIONS.LOAD_USER, 
        payload: response.data.user 
      });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    clearError,
    updateProfile,
    loadUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
