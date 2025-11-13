// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeModelTabs();
});

// Model tab switching
function initializeModelTabs() {
    document.querySelectorAll('.model-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchModel(this);
        });
    });
}

function switchModel(clickedTab) {
    // Remove active class from all tabs and sections
    document.querySelectorAll('.model-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.model-section').forEach(s => s.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding section
    clickedTab.classList.add('active');
    const modelId = clickedTab.getAttribute('data-model');
    document.getElementById(modelId + '-section').classList.add('active');
}

// Prediction Functions
function predictStatus() {
    const speed = getInputValue('status-speed');
    const vehicle = document.getElementById('status-vehicle').value;
    
    simulateLoading('status-loading', function() {
        const result = predictStatusModel(speed, vehicle);
        
        showElement('status-results');
        setTextContent('status-prediction', result.status.replace(/_/g, ' ').toUpperCase());
        setTextContent('status-confidence', (result.confidence * 100).toFixed(1) + '%');
        document.getElementById('status-confidence-bar').style.width = (result.confidence * 100) + '%';
        
        createStatusChart(result.status, result.confidence);
    });
}

function predictSpeed() {
    const weatherInt = getInputValue('speed-weather-int');
    const wind = getInputValue('speed-wind');
    const hour = getInputValue('speed-hour');
    
    const result = predictSpeedModel(weatherInt, wind, hour);
    
    showElement('speed-results');
    setTextContent('speed-prediction', result.predictedSpeed + ' km/h');
    
    createSpeedChart(
        result.baseSpeed,
        result.weatherFactor,
        result.windFactor,
        result.timeFactor,
        result.predictedSpeed
    );
}

function predictEmergency() {
    const speed = getInputValue('emerg-speed');
    const result = predictEmergencyModel(speed);
    
    showElement('emergency-results');
    
    const statusElem = document.getElementById('emergency-status');
    if (result.isEmergency) {
        statusElem.innerHTML = '<span class="status-indicator status-emergency"></span>EMERGENCY DETECTED';
        statusElem.classList.add('emergency');
        showElement('emergency-warning');
    } else {
        statusElem.innerHTML = '<span class="status-indicator status-normal"></span>NORMAL VEHICLE';
        statusElem.classList.remove('emergency');
        hideElement('emergency-warning');
    }
    
    setTextContent('emergency-confidence', (result.confidence * 100).toFixed(1) + '%');
    document.getElementById('emergency-confidence-bar').style.width = (result.confidence * 100) + '%';
    
    createEmergencyChart(result.isEmergency, speed, result.confidence);
}

function predictWeatherImpact() {
    const intensity = getInputValue('weather-intensity');
    const opacity = getInputValue('weather-opacity');
    const wind = getInputValue('weather-wind');
    const currentSpeed = getInputValue('weather-speed');
    
    const result = predictWeatherImpactModel(intensity, opacity, wind, currentSpeed);
    
    showElement('weather-results');
    setTextContent('weather-adjusted-speed', result.adjustedSpeed + ' km/h');
    setTextContent('weather-reduction', '-' + result.reduction + ' km/h');
    setTextContent('weather-hazard', result.hazardScore + '/100');
    
    createWeatherChart(currentSpeed, result.adjustedSpeed, intensity, opacity, wind);
}

function predictCluster() {
    const speed = getInputValue('cluster-speed');
    const lon = getInputValue('cluster-lon');
    
    const result = predictClusterModel(speed, lon);
    
    showElement('clustering-results');
    setTextContent('cluster-id', 'Cluster ' + result.clusterId);
    setTextContent('cluster-type', result.clusterType);
    setTextContent('cluster-pattern', result.pattern);
    
    createClusterChart(result.clusterId);
}

function clearResults(model) {
    hideElement(model + '-results');
    if (model === 'emergency') {
        hideElement('emergency-warning');
    }
}
