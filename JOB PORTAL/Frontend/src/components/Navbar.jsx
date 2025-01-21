import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
         Job Seeker
        </Typography>

        <Box>
          
         
          <Button
            onClick={handleLogout}
            sx={{
              backgroundColor: 'red',
              color: 'white',
              fontWeight: 'bold',
              ml: 1,
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
