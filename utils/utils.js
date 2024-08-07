const getCurrentDateandTime = () => {
    // Collect current date and time, will be useful for debugging and monitoring 
    return new Date().toLocaleString();
};

export { getCurrentDateandTime };