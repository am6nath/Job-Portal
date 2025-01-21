
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:9000/auth/login', { email, password, });

      // // Store token and user details in localStorage
      // localStorage.setItem('token', data.token);
      // localStorage.setItem('userId', data.result._id);
      // localStorage.setItem('name', data.result.name);
      // localStorage.setItem('email', data.result.email);

      // Redirect based on user role
      if (data.result.isAdmin) {
        navigate('/ViewJob'); // Redirect to admin dashboard
      } else {
        navigate('/BrowseJobs'); // Redirect to user job browsing page
      }
    } catch (err) {
      console.error('Error:', err.message);
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 4 }}>
      <Paper elevation={8} sx={{ padding: 4, width: '100%', maxWidth: 400, textAlign: 'center', backgroundColor: '#000', color: '#fff' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#fff' }}>Login</Typography>

        {/* Error Message */}
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} onSubmit={handleLogin}>
          <TextField
            required
            type="email"
            id="email"
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              input: { color: '#fff' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#666' },
                '&:hover fieldset': { borderColor: '#fff' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
              '& .MuiInputLabel-root': { color: '#aaa' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
            }}
          />
          <TextField
            required
            type={showPassword ? 'text' : 'password'}
            id="password"
            label="Password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              input: { color: '#fff' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#666' },
                '&:hover fieldset': { borderColor: '#fff' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
              '& .MuiInputLabel-root': { color: '#aaa' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end" sx={{ color: '#fff' }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.5, backgroundColor: '#fff', color: '#000', fontWeight: 'bold', '&:hover': { backgroundColor: '#333', color: '#fff' } }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }}>
          Don't have an account? <Link href="/signup" sx={{ color: '#fff' }}>Sign Up</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;
