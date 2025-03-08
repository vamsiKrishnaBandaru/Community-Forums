// Environment configuration
const config = {
  // API base URL - changes based on environment
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
  
  // Other environment-specific configurations
  ENV: process.env.NODE_ENV || 'development',
  
  // Feature flags
  FEATURES: {
    ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true' || false,
  }
};

export default config; 