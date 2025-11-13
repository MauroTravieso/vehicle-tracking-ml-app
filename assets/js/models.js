// Status Classification Model
function predictStatusModel(speed, vehicle) {
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
    
    return { status, confidence };
}

// Speed Prediction Model
function predictSpeedModel(weatherInt, wind, hour) {
    const baseSpeed = 45;
    const weatherFactor = 1 - (weatherInt * 0.3);
    const windFactor = 1 - (wind / 100);
    const timeFactor = (hour >= 7 && hour <= 19) ? 1.1 : 0.9;
    
    const predictedSpeed = (baseSpeed * weatherFactor * windFactor * timeFactor).toFixed(1);
    
    return {
        predictedSpeed,
        baseSpeed,
        weatherFactor,
        windFactor,
        timeFactor
    };
}

// Emergency Detection Model
function predictEmergencyModel(speed) {
    const isEmergency = speed > 70;
    const confidence = isEmergency ? 0.92 : 0.88;
    
    return { isEmergency, confidence };
}

// Weather Impact Model
function predictWeatherImpactModel(intensity, opacity, wind, currentSpeed) {
    const weatherImpact = intensity * opacity * wind;
    const reduction = (weatherImpact * 10).toFixed(1);
    const adjustedSpeed = Math.max(5, currentSpeed - reduction).toFixed(1);
    const hazardScore = (weatherImpact * 50).toFixed(1);
    
    return {
        adjustedSpeed,
        reduction,
        hazardScore,
        weatherImpact
    };
}

// Clustering Model
function predictClusterModel(speed, lon) {
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
    
    return { clusterId, clusterType, pattern };
}
