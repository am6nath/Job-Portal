
import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, Divider } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';

const JobCard = ({ job }) => {
  const { jobid, title, location, jobType, qualification, closingDate, salary, Company, _id } = job;

  const handleApply = async () => {
    const token = localStorage.getItem('token'); // Get token from localStorage
  
    if (!token) {
      alert('Please log in to apply for jobs.');
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:9000/user/apply-job/${_id}`,
        {}, // Send the necessary request body, make sure it's correct
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Application submitted successfully!');
      console.log(response.data);
    } catch (err) {
      // Provide more details for debugging
      if (err.response) {
        console.error('Error response data:', err.response.data); // Server response error
        alert(`Error: ${err.response?.data?.message || 'An error occurred while applying for the job.'}`);
      } else if (err.request) {
        console.error('Error request:', err.request); // Request was made but no response
        alert('Network error or no response from server.');
      } else {
        console.error('Error:', err.message); // Other types of errors
        alert('An unexpected error occurred.');
      }
    }
  };
  

  return (
    <Card sx={{ maxWidth: 600, border: "1px solid #ddd", borderRadius: 2, boxShadow: "0px 2px 8px rgba(0,0,0,0.1)", padding: 2, mb: 3 }}>
      <CardContent>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>{jobid}</Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>{Company}</Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>{title}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{location}</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip label={jobType} variant="outlined" sx={{ fontWeight: "bold" }} />
          <Chip label={qualification} variant="outlined" sx={{ fontWeight: "bold" }} />
          <Chip label={salary} variant="outlined" sx={{ fontWeight: "bold" }} />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}><strong>Closing Date:</strong> {closingDate}</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button variant="outlined" sx={{ color: "green", fontWeight: "bold" }} onClick={handleApply}>
            Quick Apply
          </Button>
          
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;