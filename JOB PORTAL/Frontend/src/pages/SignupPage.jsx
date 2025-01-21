import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/auth/register', {
        email,
        password,
        name,
      });
      console.log('Signup successful:', response.data);
      alert('Signup successful!');
      navigate('/loginpage');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error:' + error.message);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#fff',
        color: '#fff',
        padding: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(255, 255, 255, 0.2)',
        }}
      >
        <Typography variant="h4" sx={{
          mb: 3,
          fontWeight: 'bold',
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}>
          Sign Up
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <TextField
            required
            type="text"
            id="name"
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              input: { color: '#fff' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#666',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#aaa',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#fff',
              },
            }}
          />
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
                '& fieldset': {
                  borderColor: '#666',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#aaa',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#fff',
              },
            }}
          />
          <TextField
            required
            type="password"
            id="password"
            label="Password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

            sx={{
              input: { color: '#fff' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#666',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#aaa',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#fff',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              '&:hover': {
                backgroundColor: '#333',
                color: '#fff',
              },
            }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;