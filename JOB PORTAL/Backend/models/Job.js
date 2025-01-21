

import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobid: { type: String, required: true },
  title: { type: String, required: true },
  Company: { type: String, required: true },
  qualification: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  jobType: { type: String, required: true },
  jobSector: { type: String, required: true },
  closingDate: { type: Date, required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Track applicants //new1
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
