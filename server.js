import path from 'path';
import apiRoutes from './routes/apiRoutes/index.js';
import express from 'express';
import { __filename, __dirname } from './utils/pathHelpers.js';

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse incoming string or array data 
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming JSON data
app.use(express.json());

// Route handlers (Sets the address)
app.use('/api', apiRoutes);

app.use(express.static('public'));

// REMEMBER: This route should take us to /notes
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// '/' brings us to the root route of the server! This is the route used to create a homepage for a server.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// Highlight which port project is being hosted on
app.listen(PORT, () => {
    // Collect current date and time, will be useful for debugging and monitoring 
    const currentDateandTime = new Date().toLocaleString();
    
    console.log('✔️ ' + ` ${currentDateandTime} | API server running at http://localhost:${PORT}`);
});
