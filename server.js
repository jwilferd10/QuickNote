import apiRoutes from './routes/apiRoutes/index.js';
import htmlRoutes from './routes/htmlRoutes/index.js';
import express from 'express';

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse incoming string or array data 
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming JSON data
app.use(express.json());

// Route handlers (Sets the address)
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Serve static files
app.use(express.static('public'));

// Highlight which port project is being hosted on
app.listen(PORT, () => {
    // Collect current date and time, will be useful for debugging and monitoring 
    const currentDateandTime = new Date().toLocaleString();
    
    console.log('✔️ ' + ` ${currentDateandTime} | API server running at http://localhost:${PORT}`);
});
