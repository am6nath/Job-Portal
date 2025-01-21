
import Job from '../models/Job.js';


export const createJob = async (req, res) => {
  try {
    const { title, jobType, company, location, salary, closingDate } = req.body;

    if (!title || !jobType || !company || !location || !salary || !closingDate) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create job', error: error.message });
  }
};


export const deleteJob = async (req, res) => {
  try {
    const JOBID = await Job.findByIdAndDelete(req.params.id);
    if (!JOBID) {
      return res.status(404).json({ success: false, error: 'Job not found.' });
    }
    res.status(200).json({ success: true, message: 'Job deleted successfully.', data: JOBID });
  } catch (error) {
    console.error(`Error deleting job data with ID ${req.params.id}:`, error);
    res.status(500).json({ success: false, error: 'Delete operation failed.', message: error.message });
  }
};


export const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Job updated successfully', updatedJob });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update job', error });
  }
};
