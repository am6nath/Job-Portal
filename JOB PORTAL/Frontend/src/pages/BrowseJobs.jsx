import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import JobCard from '../components/JobCard'; 
import TopGridBar from '../components/TopGridBar'; 
import Navigationbar from '../components/Navbar';

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]); // Initialize jobs as an empty array
  const [filteredJobs, setFilteredJobs] = useState([]); // Initialize filtered jobs as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState({}); // Initialize filter options as an empty object
  
  const [applicationLoading, setApplicationLoading] = useState(false); // Added state to track application loading
  const [applicationError, setApplicationError] = useState(null); // Added state to track application error

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await axios.get('http://localhost:9000/user/browse-jobs');
        setJobs(response.data.jobs); // Corrected variable name
        setFilteredJobs(response.data.jobs); // Initialize filtered jobs with all jobs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchJobs();
  }, []);

  const handleFilterApply = (options) => {
    setFilterOptions(options);
    const filtered = jobs.filter((job) => {
      return (
        (options.jobSector === undefined || job.jobSector === options.jobSector) &&
        (options.jobType === undefined || job.jobType === options.jobType) &&
        (options.location === undefined || job.location === options.location)
      );
    });
    setFilteredJobs(filtered);
  };

  const handleApply = async (jobId) => {
    setApplicationLoading(true);
    try {
      const response = await axios.post(`http://localhost:9000/user/apply-job/${jobId}`);
      console.log(response.data);
      alert("Successfully applied for the job!"); // Notify user on success
    } catch (err) {
      setApplicationError(err.message);
    } finally {
      setApplicationLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  // No jobs found state
  if (!Array.isArray(filteredJobs) || filteredJobs.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="text.secondary">
          No jobs found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Navigationbar/>
      <br/>
      <TopGridBar onFilterApply={handleFilterApply} />
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <JobCard job={job} onApply={() => handleApply(job._id)} /> {/* Added onApply prop */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BrowseJobs;
