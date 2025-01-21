


import express from 'express';
import { viewJob, applyForJob, getAppliedJobs } from '../controllers/userController.js';


const router = express.Router();

router.get('/browse-jobs', viewJob);
router.post('/apply-job/:id', applyForJob);
router.get('/applied-jobs', getAppliedJobs);

export default router;
