import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../reducer';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');
  
  const { name, email, password, confirmPassword } = formData;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (isError) {
      setFormError(message);
    }
    
    if (isSuccess || user) {
      navigate('/');
    }
    
    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (value.trim().length > 50) {
          error = 'Name cannot exceed 50 characters';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          error = 'Invalid email address';
        }
        break;
        
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
        
      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };
  
  const onChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    
    // Validate field on change
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };
  
  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      errors[key] = error;
      if (error) {
        isValid = false;
      }
    });
    
    setFormErrors(errors);
    return isValid;
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    
    if (validateForm()) {
      const userData = {
        name,
        email,
        password
      };
      
      dispatch(register(userData));
    }
  };
  
  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        
        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}
        
        <Box component="form" onSubmit={onSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={onChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
            onBlur={() => {
              const error = validateField('name', name);
              setFormErrors(prev => ({ ...prev, name: error }));
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={onChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            onBlur={() => {
              const error = validateField('email', email);
              setFormErrors(prev => ({ ...prev, email: error }));
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={onChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            onBlur={() => {
              const error = validateField('password', password);
              setFormErrors(prev => ({ ...prev, password: error }));
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            onBlur={() => {
              const error = validateField('confirmPassword', confirmPassword);
              setFormErrors(prev => ({ ...prev, confirmPassword: error }));
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading || Object.values(formErrors).some(error => error)}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="text"
              onClick={() => navigate('/login')}
            >
              Already have an account? Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 