// Constants
const MODEL_METRICS = {
    status: {
        accuracy: 86.86,
        f1Score: 0.8591
    },
    speed: {
        rmse: 25.49,
        r2Score: 82.21
    },
    clustering: {
        silhouetteScore: 0.4767
    }
};

const CLUSTER_DATA = [
    { name: 'West SF Ground', vehicles: 1685, avgSpeed: 24.31, color: '#3498db' },
    { name: 'Central SF Ground', vehicles: 1681, avgSpeed: 24.81, color: '#2ecc71' },
    { name: 'Aircraft Zone', vehicles: 222, avgSpeed: 305.53, color: '#e74c3c' }
];

// Utility Functions
function showElement(id) {
    document.getElementById(id).style.display = 'block';
}

function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

function getInputValue(id) {
    return parseFloat(document.getElementById(id).value);
}

function setTextContent(id, text) {
    document.getElementById(id).textContent = text;
}

function simulateLoading(loadingId, callback, duration = 1000) {
    showElement(loadingId);
    setTimeout(() => {
        hideElement(loadingId);
        callback();
    }, duration);
}
