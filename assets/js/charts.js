// Chart instances (global for cleanup)
let chartInstances = {
    status: null,
    speed: null,
    emergency: null,
    weather: null,
    cluster: null
};

// Destroy existing chart before creating new one
function destroyChart(chartName) {
    if (chartInstances[chartName] && typeof chartInstances[chartName].destroy === 'function') {
        chartInstances[chartName].destroy();
    }
}

// Status Chart
function createStatusChart(status, confidence) {
    destroyChart('status');
    const ctx = document.getElementById('statusChart');
    
    chartInstances.status = new Chart(ctx, {
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
                legend: { position: 'bottom' },
                title: {
                    display: true,
                    text: 'Prediction: ' + status.replace(/_/g, ' ').toUpperCase(),
                    font: { size: 16, weight: 'bold' }
                }
            }
        }
    });
}

// Speed Chart
function createSpeedChart(base, weatherF, windF, timeF, final) {
    destroyChart('speed');
    const ctx = document.getElementById('speedChart');
    
    chartInstances.speed = new Chart(ctx, {
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
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Speed (km/h)' }
                }
            }
        }
    });
}

// Emergency Chart
function createEmergencyChart(isEmergency, speed, confidence) {
    destroyChart('emergency');
    const ctx = document.getElementById('emergencyChart');
    
    const speedFactor = Math.min(speed / 100, 1) * 100;
    const riskLevel = isEmergency ? 90 : 20;
    const priority = isEmergency ? 95 : 30;
    const alertStatus = isEmergency ? 100 : 10;
    
    chartInstances.emergency = new Chart(ctx, {
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
                    ticks: { stepSize: 20 }
                }
            },
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// Weather Chart
function createWeatherChart(current, adjusted, intensity, opacity, wind) {
    destroyChart('weather');
    const ctx = document.getElementById('weatherChart');
    
    chartInstances.weather = new Chart(ctx, {
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
            plugins: { legend: { position: 'bottom' } },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Speed (km/h)' }
                },
                x: {
                    title: { display: true, text: 'Weather Severity' }
                }
            }
        }
    });
}

// Cluster Chart
function createClusterChart(clusterId) {
    destroyChart('cluster');
    const ctx = document.getElementById('clusterChart');
    
    chartInstances.cluster = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: CLUSTER_DATA.map(c => c.name),
            datasets: [{
                label: 'Number of Vehicles',
                data: CLUSTER_DATA.map(c => c.vehicles),
                backgroundColor: CLUSTER_DATA.map((c, i) => i === clusterId ? c.color : c.color + '80'),
                borderColor: CLUSTER_DATA.map(c => c.color),
                borderWidth: CLUSTER_DATA.map((c, i) => i === clusterId ? 3 : 1)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Your vehicle is in Cluster ' + clusterId,
                    font: { size: 14, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Number of Vehicles' }
                }
            }
        }
    });
}
