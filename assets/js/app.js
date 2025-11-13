// ====================================
// Model Tab Switching
// ====================================
document.querySelectorAll('.model-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.model-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.model-section').forEach(s => s.classList.remove('active'));
        
        this.classList.add('active');
        const modelId = this.getAttribute('data-model');
        document.getElementById(modelId + '-section').classList.add('active');
    });
});

// ====================================
// Status Classification Prediction
// ====================================
function predictStatus() {
    const speed = parseFloat(document.getElementById('status-speed').value);
    const vehicle = document.getElementById('status-vehicle').value;
    
    document.getElementById('status-loading').style.display = 'block';
    
    setTimeout(() => {
        let status, confidence;
        
        if (speed === 0) {
            status = 'parked';
            confidence = 0.95;
        } else if (vehicle === 'airplane' && speed > 200) {
            status = 'in_flight';
            confidence = 0.98;
        } else if (vehicle === 'boat' && speed > 10 && speed < 40) {
            status = 'cruising_route';
            confidence = 0.87;
        } else if (speed > 60) {
            status = 'responding';
            confidence = 0.72;
        } else if (speed < 30) {
            status = 'in_service';
            confidence = 0.83;
        } else {
            status = 'en_route';
            confidence = 0.79;
        }
        
        document.getElementById('status-loading').style.display = 'none';
        document.getElementById('status-results').style.display = 'block';
        document.getElementById('status-prediction').textContent = status.replace(/_/g, ' ').toUpperCase();
        document.getElementById('status-confidence').textContent = (confidence * 100).toFixed(1) + '%';
        document.getElementById('status-confidence-bar').style.width = (confidence * 100) + '%';
        
        createStatusChart(status, confidence);
    }, 1000);
}

// ====================================
// Speed Prediction
// ====================================
function predictSpeed() {
    const weatherInt = parseFloat(document.getElementById('speed-weather-int').value);
    const wind = parseFloat(document.getElementById('speed-wind').value);
    const hour = parseFloat(document.getElementById('speed-hour').value);
    
    let baseSpeed = 45;
    const weatherFactor = 1 - (weatherInt * 0.3);
    const windFactor = 1 - (wind / 100);
    const timeFactor = (hour >= 7 && hour <= 19) ? 1.1 : 0.9;
    
    const predictedSpeed = (baseSpeed * weatherFactor * windFactor * timeFactor).toFixed(1);
    
    document.getElementById('speed-results').style.display = 'block';
    document.getElementById('speed-prediction').textContent = predictedSpeed + ' km/h';
    
    createSpeedChart(baseSpeed, weatherFactor, windFactor, timeFactor, predictedSpeed);
}

// ====================================
// Emergency Detection
// ====================================
function predictEmergency() {
    const speed = parseFloat(document.getElementById('emerg-speed').value);
    
    const isEmergency = speed > 70;
    const confidence = isEmergency ? 0.92 : 0.88;
    
    document.getElementById('emergency-results').style.display = 'block';
    
    const statusElem = document.getElementById('emergency-status');
    if (isEmergency) {
        statusElem.innerHTML = '<span class="status-indicator status-emergency"></span>EMERGENCY DETECTED';
        statusElem.classList.add('emergency');
        document.getElementById('emergency-warning').style.display = 'block';
    } else {
        statusElem.innerHTML = '<span class="status-indicator status-normal"></span>NORMAL VEHICLE';
        statusElem.classList.remove('emergency');
        document.getElementById('emergency-warning').style.display = 'none';
    }
    
    document.getElementById('emergency-confidence').textContent = (confidence * 100).toFixed(1) + '%';
    document.getElementById('emergency-confidence-bar').style.width = (confidence * 100) + '%';
    
    createEmergencyChart(isEmergency, speed, confidence);
}

// ====================================
// Weather Impact Analysis
// ====================================
function predictWeatherImpact() {
    const intensity = parseFloat(document.getElementById('weather-intensity').value);
    const opacity = parseFloat(document.getElementById('weather-opacity').value);
    const wind = parseFloat(document.getElementById('weather-wind').value);
    const currentSpeed = parseFloat(document.getElementById('weather-speed').value);
    
    const weatherImpact = intensity * opacity * wind;
    const reduction = (weatherImpact * 10).toFixed(1);
    const adjustedSpeed = Math.max(5, currentSpeed - reduction).toFixed(1);
    const hazardScore = (weatherImpact * 50).toFixed(1);
    
    document.getElementById('weather-results').style.display = 'block';
    document.getElementById('weather-adjusted-speed').textContent = adjustedSpeed + ' km/h';
    document.getElementById('weather-reduction').textContent = '-' + reduction + ' km/h';
    document.getElementById('weather-hazard').textContent = hazardScore + '/100';
    
    createWeatherChart(currentSpeed, adjustedSpeed, intensity, opacity, wind);
}

// ====================================
// Clustering Prediction
// ====================================
function predictCluster() {
    const speed = parseFloat(document.getElementById('cluster-speed').value);
    const lon = parseFloat(document.getElementById('cluster-lon').value);
    
    let clusterId, clusterType, pattern;
    
    if (speed > 200) {
        clusterId = 2;
        clusterType = 'Aircraft Zone';
        pattern = 'High-speed aerial vehicles';
    } else if (lon < -122.43) {
        clusterId = 0;
        clusterType = 'West SF Ground';
        pattern = 'Urban ground vehicles';
    } else {
        clusterId = 1;
        clusterType = 'Central SF Ground';
        pattern = 'Mixed transit vehicles';
    }
    
    document.getElementById('clustering-results').style.display = 'block';
    document.getElementById('cluster-id').textContent = 'Cluster ' + clusterId;
    document.getElementById('cluster-type').textContent = clusterType;
    document.getElementById('cluster-pattern').textContent = pattern;
    
    createClusterChart(clusterId);
}

// ====================================
// Clear Results Function
// ====================================
function clearResults(model) {
    document.getElementById(model + '-results').style.display = 'none';
    if (model === 'emergency') {
        document.getElementById('emergency-warning').style.display = 'none';
    }
}

// ====================================
// Chart Creation Functions
// ====================================

function createStatusChart(status, confidence) {
    const ctx = document.getElementById('statusChart');
    if (window.statusChartInstance && typeof window.statusChartInstance.destroy === 'function') {
        window.statusChartInstance.destroy();
    }
    
    window.statusChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Confidence', 'Uncertainty'],
            datasets: [{
                data: [confidence * 100, (1 - confidence) * 100],
                backgroundColor: ['#27ae60', '#e0e0e0'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Prediction: ' + status.replace(/_/g, ' ').toUpperCase(),
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

function createSpeedChart(base, weatherF, windF, timeF, final) {
    const ctx = document.getElementById('speedChart');
    if (window.speedChartInstance && typeof window.speedChartInstance.destroy === 'function') {
        window.speedChartInstance.destroy();
    }
    
    window.speedChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Base Speed', 'After Weather', 'After Wind', 'Final Speed'],
            datasets: [{
                label: 'Speed (km/h)',
                data: [
                    base.toFixed(1),
                    (base * weatherF).toFixed(1),
                    (base * weatherF * windF).toFixed(1),
                    final
                ],
                backgroundColor: ['#3498db', '#f39c12', '#9b59b6', '#27ae60'],
                borderColor: ['#2980b9', '#e67e22', '#8e44ad', '#229954'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Speed (km/h)'
                    }
                }
            }
        }
    });
}

function createEmergencyChart(isEmergency, speed, confidence) {
    const ctx = document.getElementById('emergencyChart');
    if (window.emergencyChartInstance && typeof window.emergencyChartInstance.destroy === 'function') {
        window.emergencyChartInstance.destroy();
    }
    
    const speedFactor = Math.min(speed / 100, 1) * 100;
    const riskLevel = isEmergency ? 90 : 20;
    const priority = isEmergency ? 95 : 30;
    const alertStatus = isEmergency ? 100 : 10;
    
    window.emergencyChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Speed Factor', 'Confidence', 'Risk Level', 'Priority', 'Alert Status'],
            datasets: [{
                label: isEmergency ? 'Emergency Vehicle' : 'Normal Vehicle',
                data: [speedFactor, confidence * 100, riskLevel, priority, alertStatus],
                backgroundColor: isEmergency ? 'rgba(231, 76, 60, 0.2)' : 'rgba(46, 204, 113, 0.2)',
                borderColor: isEmergency ? '#e74c3c' : '#2ecc71',
                borderWidth: 2,
                pointBackgroundColor: isEmergency ? '#e74c3c' : '#2ecc71',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createWeatherChart(current, adjusted, intensity, opacity, wind) {
    const ctx = document.getElementById('weatherChart');
    if (window.weatherChartInstance && typeof window.weatherChartInstance.destroy === 'function') {
        window.weatherChartInstance.destroy();
    }
    
    window.weatherChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Clear', 'Light', 'Moderate', 'Heavy', 'Severe'],
            datasets: [{
                label: 'Speed (km/h)',
                data: [
                    current,
                    current * 0.95,
                    current * 0.85,
                    adjusted,
                    current * 0.65
                ],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: '#3498db',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }, {
                label: 'Current Conditions',
                data: [null, null, null, adjusted, null],
                borderColor: '#e74c3c',
                backgroundColor: '#e74c3c',
                pointRadius: 8,
                pointStyle: 'star'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Speed (km/h)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Weather Severity'
                    }
                }
            }
        }
    });
}

function createClusterChart(clusterId) {
    const ctx = document.getElementById('clusterChart');
    if (window.clusterChartInstance && typeof window.clusterChartInstance.destroy === 'function') {
        window.clusterChartInstance.destroy();
    }
    
    const clusterData = [
        { name: 'West SF Ground', vehicles: 1685, avgSpeed: 24.31, color: '#3498db' },
        { name: 'Central SF Ground', vehicles: 1681, avgSpeed: 24.81, color: '#2ecc71' },
        { name: 'Aircraft Zone', vehicles: 222, avgSpeed: 305.53, color: '#e74c3c' }
    ];
    
    window.clusterChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: clusterData.map(c => c.name),
            datasets: [{
                label: 'Number of Vehicles',
                data: clusterData.map(c => c.vehicles),
                backgroundColor: clusterData.map((c, i) => i === clusterId ? c.color : c.color + '80'),
                borderColor: clusterData.map(c => c.color),
                borderWidth: clusterData.map((c, i) => i === clusterId ? 3 : 1)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Your vehicle is in Cluster ' + clusterId,
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Vehicles'
                    }
                }
            }
        }
    });
}
