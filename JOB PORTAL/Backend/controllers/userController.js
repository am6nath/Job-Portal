
import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

export const viewJob = async (req, res) => {
  try {
    const { jobType, jobSector, location } = req.query;

    const filter = {};
    if (jobType) filter.jobType = jobType;
    if (jobSector) filter.jobSector = jobSector;
    if (location) filter.location = location;

    const jobs = await Job.find(filter).select('-__v'); // Exclude unnecessary fields
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch jobs', error: error.message });
  }
};


// userController.js

export const applyForJob = async (req, res) => {
  try {
    const userId = req.user.id; // From middleware
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Check if user has already applied
    const existingApplication = await Application.findOne({ user: userId, job: jobId });
    if (existingApplication) return res.status(400).json({ message: 'Already applied for this job' });

    // Create new application
    const application = new Application({ job: jobId, user: userId });
    await application.save();

    // Add user to job's applicants list
    job.applicants.push(userId);
    await job.save();

    // Add job to user's appliedJobs list
    const user = await User.findById(userId);
    user.appliedJobs.push(jobId);
    await user.save();

    res.status(201).json({ message: 'Job application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Failed to apply for job', error });
  }
};






export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id; // From middleware

    const user = await User.findById(userId).populate('appliedJobs');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ appliedJobs: user.appliedJobs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applied jobs', error });
  }
};
// export const getAppliedJobs = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const limit = Number(req.query.limit) || 10;
//     const page = Number(req.query.page) || 1;

//     const user = await User.findById(userId)
//       .populate({
//         path: 'appliedJobs',
//         options: { limit, skip: (page - 1) * limit },
//       });

//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });

//     res.status(200).json({ success: true, appliedJobs: user.appliedJobs, page, limit });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to fetch applied jobs', error: error.message });
//   }
// };

// export const getProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).select('-password');
//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });
//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to fetch profile data', error: error.message });
//   }
// };
