// auth.js - Authentication Manager
const AuthManager = {
    // Check if user is authenticated
    isAuthenticated() {
        const authData = sessionStorage.getItem('vehicleTrackingAuth');
        if (!authData) return false;
        
        try {
            const data = JSON.parse(authData);
            // Check if session is still valid (optional: add expiration check)
            return data.username && data.timestamp;
        } catch (e) {
            return false;
        }
    },
    
    // Set authentication
    setAuth(username) {
        const authData = {
            username: username,
            timestamp: new Date().toISOString(),
            loginTime: Date.now()
        };
        sessionStorage.setItem('vehicleTrackingAuth', JSON.stringify(authData));
    },
    
    // Clear authentication
    clearAuth() {
        sessionStorage.removeItem('vehicleTrackingAuth');
    },
    
    // Get current user
    getCurrentUser() {
        const authData = sessionStorage.getItem('vehicleTrackingAuth');
        if (!authData) return null;
        try {
            return JSON.parse(authData);
        } catch (e) {
            return null;
        }
    },
    
    // Redirect to login
    redirectToLogin() {
        window.location.href = 'index.html';
    },
    
    // Redirect to main app
    redirectToApp() {
        window.location.href = 'dashboard.html';
    }
};

// Export for use in other files
window.AuthManager = AuthManager;
