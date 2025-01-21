

import express from 'express';
import { createJob, updateJob, deleteJob } from '../controllers/adminController.js';


const router = express.Router();

router.post('/job', createJob);
router.put('/job/:id', updateJob);
router.delete('/job/:id', deleteJob);

export default router;
