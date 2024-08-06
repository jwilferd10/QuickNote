import path from 'path';
import express from 'express';
import { __filename, __dirname } from '../../utils/pathHelpers.js';

// Create router instance
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

router.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

export default router;