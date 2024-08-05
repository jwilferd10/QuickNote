import express from 'express';
import notes from './notesRoutes.js';

// Create the router instance
const router = express.Router();

router.use(notes);

export default router;