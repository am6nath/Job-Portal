import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get('http://localhost:9000/user/applied-jobs');
        setAppliedJobs(response.data.appliedJobs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Applied Jobs
      </Typography>
      <Grid container spacing={3}>
        {appliedJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AppliedJobs;