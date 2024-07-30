import { fileURLToPath } from 'url';
import path from 'path';

// Convert the current module's URL to a file path
const __filename = fileURLToPath(import.meta.url);

// Collect directory name of current module's file path
const __dirname = path.dirname(__filename);

// Export constants for use in other modules
export { __filename, __dirname };