# Vehicle Tracking ML API Documentation

## Endpoints (Client-Side JavaScript)

### 1. Status Classification
**Function**: `predictStatus(features)`

**Input**:
```javascript
{
    "latitude": 37.7749,
    "longitude": -122.4194,
    "speed": 35,
    "heading": 90,
    "vehicle_type": "land_vehicle",
    "weather_type": "heavy_clouds"
}
```

**Output**:
```javascript
{
    "prediction": "in_service",
    "confidence": 0.83,
    "features_used": ["latitude", "longitude", "speed", ...]
}
```

### 2. Speed Prediction
**Function**: `predictSpeed(features)`

**Input**:
```javascript
{
    "latitude": 37.7749,
    "longitude": -122.4194,
    "heading": 90,
    "weather_intensity": 0.15,
    "wind_speed": 15,
    "hour_of_day": 14,
    "vehicle_type": "land_vehicle"
}
```

**Output**:
```javascript
{
    "prediction": 42.3,
    "rmse": 25.49,
    "r2_score": 0.8221
}
```

### 3. Emergency Detection
**Function**: `predictEmergency(features)`

**Input**:
```javascript
{
    "speed": 75,
    "latitude": 37.7376,
    "longitude": -122.4341,
    "heading": 180,
    "is_high_speed": 1
}
```

**Output**:
```javascript
{
    "prediction": 1,
    "confidence": 0.92,
    "emergency_probability": 0.8,
    "status": "EMERGENCY"
}
```

### 4. Weather Impact
**Function**: `predictWeatherImpact(features)`

**Input**:
```javascript
{
    "weather_intensity": 0.25,
    "weather_opacity": 0.30,
    "wind_speed": 18,
    "current_speed": 45
}
```

**Output**:
```javascript
{
    "adjusted_speed": 38.2,
    "speed_reduction": 6.8,
    "hazard_level": "MODERATE",
    "hazard_score": 35,
    "weather_impact_score": 0.35
}
```

### 5. Clustering
**Function**: `predictCluster(features)`

**Input**:
```javascript
{
    "latitude": 37.7360,
    "longitude": -122.4460,
    "speed": 25,
    "heading": 180
}
```

**Output**:
```javascript
{
    "cluster_id": 0,
    "cluster_type": "West SF Ground Vehicles",
    "behavior_pattern": "Urban ground vehicles, western region",
    "distance_to_center": 0.023,
    "silhouette_score": 0.4767
}
```
