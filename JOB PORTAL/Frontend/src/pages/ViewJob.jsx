import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  Button,
  Drawer,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminDashboard from '../pages/AdminDashboard';

const StyledTableCell = (props) => (
  <TableCell
    {...props}
    sx={{
      py: 1.5,
      px: 2,
      fontSize: '0.9rem',
      fontWeight: props.head ? 'bold' : 'normal',
      backgroundColor: props.head ? '#000' : '#fff', 
      color: props.head ? '#fff' : '#000', 
      borderBottom: '1px solid #ccc',
    }}
  />
);

const StyledTableRow = (props) => (
  <TableRow
    {...props}
    sx={{
      '&:nth-of-type(odd)': {
        backgroundColor: '#f7f7f7', // Light gray for alternating rows
      },
      '&:hover': {
        backgroundColor: '#e0e0e0', // Slightly darker gray on hover
      },
    }}
  />
);

const ViewJob = () => {
  const [jobdata, setJobdata] = useState([]); // List of all jobs
  const [editJob, setEditJob] = useState(null); // Job being edited
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer visibility
  const [error, setError] = useState(null);

  // Fetch jobs when the component loads
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:9000/user/browse-jobs');
        setJobdata(response.data.jobs);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setEditJob(job); // Set the job to be edited
    setDrawerOpen(true); // Open the drawer
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return;
    }
    try {
      await axios.delete(`http://localhost:9000/admin/job/${id}`);
      setJobdata(jobdata.filter((job) => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleClose = () => {
    setDrawerOpen(false); // Close the drawer
    setEditJob(null); // Reset the job being edited
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setEditJob({ ...editJob, [id]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:9000/admin/job/${editJob._id}`, editJob);
      setJobdata((prev) =>
        prev.map((job) => (job._id === editJob._id ? { ...editJob } : job))
      );
      alert('Job updated successfully!');
      handleClose(); // Close the drawer after updating
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job. Please try again.');
    }
  };

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <>
    <AdminDashboard />
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 4,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
        }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell head align="center">Job ID</StyledTableCell>
              <StyledTableCell head align="center">Job Title</StyledTableCell>
              <StyledTableCell head align="center">Location</StyledTableCell>
              <StyledTableCell head align="center">Salary</StyledTableCell>
              <StyledTableCell head align="center">Job Type</StyledTableCell>
              <StyledTableCell head align="center">Job Sector</StyledTableCell>
              <StyledTableCell head align="center">Qualification</StyledTableCell>
              <StyledTableCell head align="center">Closing Date</StyledTableCell>
              <StyledTableCell head align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobdata.map((job) => (
              <StyledTableRow key={job._id}>
                <StyledTableCell align="center">{job.jobid}</StyledTableCell>
                <StyledTableCell align="center">{job.title}</StyledTableCell>
                <StyledTableCell align="center">{job.location}</StyledTableCell>
                <StyledTableCell align="center">{job.salary}</StyledTableCell>
                <StyledTableCell align="center">{job.jobType}</StyledTableCell>
                <StyledTableCell align="center">{job.jobSector}</StyledTableCell>
                <StyledTableCell align="center">{job.qualification}</StyledTableCell>
                <StyledTableCell align="center">{job.closingDate}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(job)}
                    sx={{
                      color: '#000',
                      borderColor: '#000',
                      '&:hover': {
                        backgroundColor: '#000',
                        color: '#fff',
                      },
                      mr: 1,
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(job._id)}
                    sx={{
                      backgroundColor: '#000',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#444',
                      },
                    }}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Drawer for Editing Job */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleClose}
        sx={{ '& .MuiDrawer-paper': { width: '400px', padding: 3, backgroundColor: '#f7f7f7' } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#000',
            }}
          >
            Edit Job
          </Typography>
          <TextField
            id="jobid"
            label="Job ID"
            value={editJob?.jobid || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ backgroundColor: '#fff' }}
          />
          <TextField
            id="title"
            label="Job Title"
            value={editJob?.title || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ backgroundColor: '#fff' }}
          />
          <TextField
            id="location"
            label="Location"
            value={editJob?.location || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ backgroundColor: '#fff' }}
          />
          <TextField
            id="salary"
            label="Salary"
            value={editJob?.salary || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ backgroundColor: '#fff' }}
          />
          <TextField
           
            id="jobType"
            label="Job Type"
            variant="outlined"
            value={editJob?.jobType || ''}
            onChange={handleInputChange}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
            }}
          />
          <TextField
            
            id="jobSector"
            label="Job Sector"
            variant="outlined"
            value={editJob?.jobSector || ''}
            onChange={handleInputChange}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
            }}
          />



          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: '#fff',
                color: '#000',
                '&:hover': { backgroundColor: '#ddd' },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': { backgroundColor: '#444' },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ViewJob;
