import express from 'express';
import apiRoutes from './routes/apiRoutes/index.js';
import htmlRoutes from './routes/htmlRoutes/index.js';
import { getCurrentDateandTime } from './utils/utils.js';

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
    console.log('✔️ ' + ` ${getCurrentDateandTime()} | API server running at http://localhost:${PORT}`);
});
