import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

const EditJobs = () => {
  const { id } = useParams(); // Get the job ID from the route parameter
  const navigate = useNavigate();

  const [job, setJob] = useState({
    jobid: '',
    title: '',
    Company: '',
    qualification: '',
    location: '',
    salary: '',
    jobType: '',
    closingDate: '',
  });
  const [open, setOpen] = useState(false); // State to control the modal visibility

  // Fetch job data when the component loads
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/admin/job/${id}`);
        setJob(response.data);
        setOpen(true); // Automatically open the modal when the job data is fetched
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    fetchJob();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setJob({ ...job, [id]: value });
  };

  // Submit the updated job data
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:9000/admin/job/${id}`, job);
      alert('Job updated successfully!');
      navigate('/ViewJob'); // Redirect to the ViewJobs page after updating
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job. Please try again.');
    }
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
    navigate('/ViewJob'); // Navigate to ViewJobs if the modal is closed
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: '#000', // Black background
          color: '#fff', // White text
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Edit Job
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: '#f7f7f7', // Light gray background for content
          padding: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              type="text"
              id="jobid"
              label="Job ID"
              variant="outlined"
              value={job.jobid}
              onChange={handleInputChange}
              sx={{
                backgroundColor: '#fff', // White input background
                borderRadius: 1,
              }}
            />
            <TextField
              required
              type="text"
              id="title"
              label="Job Title"
              variant="outlined"
              value={job.title}
              onChange={handleInputChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
              }}
            />
            <TextField
              required
              type="text"
              id="Company"
              label="Company"
              variant="outlined"
              value={job.Company}
              onChange={handleInputChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
              }}
            />
            <TextField
              required
              type="text"
              id="qualification"
              label="Qualification"
              variant="outlined"
              value={job.qualification}
              onChange={handleInputChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
              }}
            />
            <TextField
              required
              type="text"
              id="location"
              label="Location"
              variant="outlined"
              value={job.location}
              onChange={handleInputChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
              }}
            />
            <TextField
              required
              type="text"
              id="salary"
              label="Salary"
              variant="outlined"
              value={job.salary}
              onChange={handleInputChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
              }}
            />
            <TextField
              required
              type="text"
              id="jobType"
              label="Job Type"
              variant="outlined"
              value={job.jobType}
              onChange={handleInputChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
              }}
            />
            <TextField
              required
              type="date"
              id="closingDate"
              label="Closing Date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={job.closingDate}
              onChange={handleInputChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
              }}
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: '#000',
          padding: 2,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: '#fff', 
            color: '#000', 
            '&:hover': {
              backgroundColor: '#ccc',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#fff',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#ccc',
            },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditJobs;

