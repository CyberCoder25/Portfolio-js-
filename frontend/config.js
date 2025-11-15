// API Configuration
const CONFIG = {
  // Automatically detect environment based on hostname
  API_URL: (() => {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    // Development: localhost or 127.0.0.1
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }
    
    // Local file access
    if (protocol === 'file:') {
      return 'http://localhost:5000/api';
    }
    
    // Production: tamta.ge domain
    return 'https://tamta.ge/api';
  })(),
  
  ENDPOINTS: {
    CONTACT: '/contact',
    CSRF_TOKEN: '/csrf-token',
    HEALTH: '/health'
  }
};

// Make it available globally
window.CONFIG = CONFIG;

// Debug log (remove in production)
console.log('🔧 API Configuration:', {
  url: CONFIG.API_URL,
  hostname: window.location.hostname
});