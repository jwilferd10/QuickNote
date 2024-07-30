import { fileURLToPath } from 'url';
import path from 'path';

// Convert the current module's URL to a file path
const __filename = fileURLToPath(import.meta.url);

// Adjust the path to move up to the ROOT directory from utils
const __dirname = path.resolve(path.dirname(__filename), '..');

// Export constants for use in other modules
export { __filename, __dirname };