
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ViewJob from './ViewJob';
import EditJobs from './EditJobs';
import AddJobs from './AddJobs';

export default function AdminDashboard() {

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login'; // Redirect to login after logout
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  function TopBarButton({ text, to }) {
    const navigate = useNavigate();
    return (
      <Button
        variant="contained"
        onClick={() => navigate(to)}
        sx={{
          backgroundColor: '#000', 
          color: '#fff',
          textAlign: 'center',
          fontSize: '12px',
          margin: '0 10px',
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: '#fff', 
            color: '#000', 
          },
        }}
      >
        {text}
      </Button>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '10vh' }}>
      {/* Horizontal Topbar */}
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          width: '100%',
          height: 64,
          backgroundColor: '#000', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Toolbar
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            width: '100%',
          }}
        >
          {/* Open AddJobs Dialog */}
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              backgroundColor: '#000', // Black background
              color: '#fff', // White text
              textAlign: 'center',
              fontSize: '12px',
              margin: '0 10px',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#fff', // White background on hover
                color: '#000', // Black text on hover
              },
            }}
          >
            + Add Jobs
          </Button>
         
          <TopBarButton text="Manage Jobs" to="/ViewJob" />
          <Button  variant="contained"
            sx={{
              backgroundColor: '#000', 
              color: '#fff', 
              textAlign: 'center',
              fontSize: '12px',
              margin: '0 10px',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#fff', 
                color: '#000', 
              },
            }} 
             onClick={handleLogout} >
            Logout
          </Button>
         
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          marginTop: 5,
          padding: 5,
          flexGrow: 1,
        }}
      >
        <Routes>
          <Route path="/ViewJob" element={<ViewJob />} />
          <Route path="/EditJobs" element={<EditJobs />} />
        </Routes>
      </Box>



      <AddJobs open={open} setOpen={setOpen} />

      
    </Box>
  );
}


