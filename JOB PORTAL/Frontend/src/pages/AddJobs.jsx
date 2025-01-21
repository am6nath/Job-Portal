
// for ADD new job details
import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
 
} from '@mui/material';

const jobTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'freelancer', label: 'Freelancer' },
];

const jobSectors = [
  { value: 'IT', label: 'Information Technology' },
  { value: 'Business', label: 'Business and Finance' },
  { value: 'Marketing', label: 'Marketing and Sales' },
  { value: 'Designer', label: 'Design and Creative' },
  { value: 'Agricultural', label: 'Agriculture and Environment' },
  { value: 'Medical', label: 'Medical and Healthcare' },
  { value: 'Pharma', label: 'Pharmaceuticals' },
  { value: 'Finance', label: 'Finance' },
  { value: 'HealthCare', label: 'HealthCare' },

];

const AddJobs = ({ open, setOpen }) => {
  const [job, setJob] = useState({
    jobid: '',
    title: '',
    Company: '',
    qualification: '',
    location: '',
    salary: '',
    jobType: '',
    jobSector: '',
    closingDate: '',
  });

  const handleInputChange = (event) => {
    setJob({ ...job, [event.target.id]: event.target.value });
  };

  const handleJobTypeChange = (event) => {
    setJob({ ...job, jobType: event.target.value });
  };

  const handleJobSectorChange = (event) => {
    setJob({ ...job, jobSector: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:9000/admin/job', job);
      console.log('Job added successfully');
      setJob({
        jobid: '',
        title: '',
        Company: '',
        qualification: '',
        location: '',
        salary: '',
        jobType: '',
        jobSector: '',
        closingDate: '',
      });
      setOpen(false);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: '#000', color: '#fff' }}>
        Add Job Details
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          backgroundColor: '#fff',
          color: '#000',
          padding: 5,

        }}
      >
        {/* Form Fields */}
        <TextField
          required
          type="text"
          id="jobid"
          label="Job ID"
          variant="outlined"
          value={job.jobid}
          onChange={handleInputChange}
        />
        <TextField
          required
          type="text"
          id="title"
          label="Job Title"
          variant="outlined"
          value={job.title}
          onChange={handleInputChange}
        />
        <TextField
          required
          type="text"
          id="Company"
          label="Company Name"
          variant="outlined"
          value={job.Company}
          onChange={handleInputChange}
        />
        <TextField
          required
          type="text"
          id="qualification"
          label="Qualification"
          variant="outlined"
          value={job.qualification}
          onChange={handleInputChange}
        />
        <TextField
          required
          type="text"
          id="location"
          label="Location"
          variant="outlined"
          value={job.location}
          onChange={handleInputChange}
        />
        <TextField
          required
          type="text"
          id="salary"
          label="Salary"
          variant="outlined"
          value={job.salary}
          onChange={handleInputChange}
        />
        <FormControl fullWidth>
          <InputLabel id="job-type-label">Job Type</InputLabel>
          <Select
            labelId="job-type-label"
            id="jobType"
            value={job.jobType}
            onChange={handleJobTypeChange}
          >
            {jobTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="job-sector-label">Job Sector</InputLabel>
          <Select
            labelId="job-sector-label"
            id="jobSector"
            value={job.jobSector}
            onChange={handleJobSectorChange}
          >
            {jobSectors.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required
          type="date"
          id="closingDate"
          label="Closing Date"
          variant="outlined"
          value={job.closingDate}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true, // Forces the label to shrink above the input
          }}

          InputProps={{
            placeholder: " ", // Sets an empty placeholder
          }}
        />
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#000', color: '#fff' }}>
        <Button onClick={handleClose} sx={{ color: '#fff', fontWeight: 'bold' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} sx={{ color: '#fff', fontWeight: 'bold' }}>
          Add Job
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobs;
