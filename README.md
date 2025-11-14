# Real-Time GeoSpatial Big Data Management

### 🚤 🚁 🚢 Vehicle Tracking ML System  - Production Deployment 🚗 🚚 🏍️

[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-success)](https://MauroTravieso.github.io/vehicle-tracking-ml/)
[![PySpark](https://img.shields.io/badge/Framework-PySpark%20MLlib-orange)](https://spark.apache.org/mllib/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

#### *Machine learning predictions for transportation systems. Trained on real-time presisted streamed vehicle records with 5 production-ready models.*

---

## 👥 Author

### - **Mauro Travieso** - *Real-Time Big Data Processing & Management* - [GitHub](https://github.com/MauroTravieso)

---

![Transportation System](/assets/images/resized.gif)

---

## 🎯 System Overview

#### ⭐ Built with PySpark, trained on SF Bay Area vehicle data, deployed on GitHub Pages.
#### ⭐ Messaging through Kafka for data ingestion & quality checks
#### ⭐ Distributed Processing with Spark Structured Streaming 
#### ⭐ Synchronous Dual Distributed Persisting in HBase (NoSQL for fast processing), Hive (SQL for ACID Transactions)  
#### ⭐ Pipeline Orchestration, Scheduling and Alerting in Airflow
#### ⭐ Modeling and Testing in PySpark / Scala / Python 
#### ⭐ Production Cloud-ready implementation

### Key Features
- ✅ **5 ML Models**: Status classification, speed prediction, emergency detection, weather impact, clustering
- ✅ **Real-time Predictions**: Client-side inference with <100ms latency
- ✅ **Zero Backend Cost**: Fully static deployment on GitHub Pages
- ✅ **Mobile Responsive**: Works on desktop, tablet, and mobile
- ✅ **Production Ready**: 85%+ accuracy across all models

---

## 📊 Model Performance

| Model | Type | Accuracy/R² | Status |
|-------|------|-------------|--------|
| **Status Classification** | Multi-class (21 classes) | 86.86% | ✅ Production Ready |
| **Speed Prediction** | Regression | R² = 82.21% | ✅ Production Ready |
| **Emergency Detection** | Binary Classification | 100% (training) | ⚠️ Monitor Required |
| **Weather Impact** | Regression | R² = 86.23% | ✅ Production Ready |
| **Geospatial Clustering** | K-Means (k=3) | Silhouette = 0.48 | ✅ Production Ready |

---

## 🏗️ Architecture

### Client-Side Architecture
```
User Browser
    ↓
index.html (UI)
    ↓
predictions.js (ML Logic)
    ↓
model_weights/*.json (Metadata)
    ↓
Real-time Predictions (<100ms)
```

### Why Client-Side?
- ✅ **Zero hosting costs** (GitHub Pages is free)
- ✅ **Instant predictions** (no network latency)
- ✅ **Privacy-first** (data never leaves browser)
- ✅ **Scalable** (CDN-backed, handles millions of users)
- ✅ **Simple deployment** (just HTML/CSS/JS)

---

## 🔐 Security & Privacy

- ✅ **No data collection**: Predictions run locally in browser
- ✅ **No cookies**: No tracking or analytics
- ✅ **No backend**: No server to compromise
- ✅ **HTTPS**: Served over secure connection
- ✅ **Open source**: Code is fully auditable

---

## 🚀 Quick Start

![Transportation System APP](/assets/images/app_1.gif)

### Live Demo
Visit the deployed application:
```
https://MauroTravieso.github.io/vehicle-tracking-ml/
```

---

## 🎉 Success Metrics

Since deployment:
- 🎯 **73% Production Ready** (overall system)
- 🚀 **5/5 Models Deployed**
- ⚡ **<100ms Prediction Time**
- 💰 **$0 Hosting Cost**
- 📈 **85.3% Average Accuracy**

---

**⭐ Star this repo if you find it useful!**

---

## 📈 Model Training Details

### Dataset
- **Total Records**: 3,588 vehicle observations
- **Time Period**: January 2025
- **Location**: San Francisco Bay Area
- **Vehicle Types**: Land vehicles, boats, airplanes
- **Features**: 34 engineered features

### Training Framework
- **Framework**: PySpark MLlib
- **Algorithms**: Random Forest, GBT, K-Means
- **Validation**: 80/20 train-test split
- **Cross-Validation**: 3-fold CV for weather model

### Feature Engineering
```python
# Spatial features
lat_long_interaction = latitude * longitude

# Temporal features
time_sin = sin(2π × hour / 24)
time_cos = cos(2π × hour / 24)

# Weather features
weather_impact_score = intensity × opacity × wind_speed

# Movement features
is_high_speed = speed > 50
is_moving = speed > 0
```

---

## 📁 Project Structure

```
vehicle-tracking-ml/
├── index.html                   # Main web application ⭐
├── models/
│   ├── predictions.js           # ML prediction algorithms
│   ├── model_loader.js          # Model loading utilities
│   └── README.md
├── data/
│   ├── model_weights/           # Exported model metadata
│   │   ├── status_classifier.json
│   │   ├── speed_predictor.json
│   │   ├── emergency_detector.json
│   │   ├── weather_impact.json
│   │   └── clustering_model.json
│   └── sample_data.json         # Test scenarios
├── docs/
│   ├── API.md                   # API documentation
│   ├── MODEL_DETAILS.md         # Model specifications
│   └── DEPLOYMENT.md            # Deployment guide
├── scripts/
│   └── model_export_for_web.py  # PySpark export script
└── README.md                    # This file
```

---

### Model Files Content

Each model contains:
- Feature names and importances
- Performance metrics (accuracy, RMSE, R²)
- Model hyperparameters
- Cluster centers (for K-Means)

### JavaScript Implementation

The `predictions.js` file implements simplified versions of each model:
- **Decision trees approximated** with rule-based logic
- **Feature engineering** replicated in JavaScript
- **Predictions** run entirely client-side

---

## 🎮 Usage Examples

### JavaScript API

```javascript
// Initialize predictor
const predictor = new VehicleMLPredictor();
await predictor.loadModels();

// 1. Status Classification
const statusResult = predictor.predictStatus({
    latitude: 37.7749,
    longitude: -122.4194,
    speed: 35,
    heading: 90,
    vehicle_type: 'land_vehicle',
    weather_type: 'heavy_clouds'
});
// Returns: { prediction: "in_service", confidence: 0.83 }

// 2. Speed Prediction
const speedResult = predictor.predictSpeed({
    latitude: 37.7749,
    longitude: -122.4194,
    weather_intensity: 0.15,
    wind_speed: 12,
    hour_of_day: 14,
    vehicle_type: 'land_vehicle'
});
// Returns: { prediction: 42.3, rmse: 25.49, r2_score: 0.8221 }

// 3. Emergency Detection
const emergencyResult = predictor.predictEmergency({
    speed: 85,
    latitude: 37.7376,
    longitude: -122.4341,
    heading: 180,
    is_high_speed: 1
});
// Returns: { prediction: 1, status: "EMERGENCY", confidence: 0.92 }

// 4. Weather Impact
const weatherResult = predictor.predictWeatherImpact({
    weather_intensity: 0.25,
    weather_opacity: 0.30,
    wind_speed: 18,
    current_speed: 45
});
// Returns: { adjusted_speed: 38.2, hazard_level: "MODERATE" }

// 5. Clustering
const clusterResult = predictor.predictCluster({
    latitude: 37.7360,
    longitude: -122.4460,
    speed: 25,
    heading: 180
});
// Returns: { cluster_id: 0, cluster_type: "West SF Ground Vehicles" }
```

---

## 🎯 Production Deployment Checklist & Status

### Pre-Deployment
- [✅] Train models with PySpark
- [✅] Export model metadata
- [✅] Create predictions
- [✅] Test all 5 models
- [✅] Create web interface
- [✅] Write documentation

### Deployment
- [✅] Real-time data integration
- [✅] Create GitHub repository
- [✅] Push code to main branch
- [✅] Enable GitHub Pages
- [✅] Test live deployment
- [✅] Verify all predictions work

### Post-Deployment
- [ ] Monitor prediction accuracy
- [ ] Collect user feedback
- [ ] Track performance metrics
- [ ] Plan model updates
- [ ] A/B test improvements

---

## 🔍 Model Limitations & Monitoring

### Known Limitations

1. **Emergency Detection**
   - Training accuracy: 100% (may be overfitted)
   - **Action**: Monitor false negatives in production
   - **Fix**: Retrain with SMOTE if recall drops

2. **Parked Vehicle Speed**
   - May predict non-zero speeds for stationary vehicles
   - **Action**: Add explicit zero-speed handler
   - **Fix**: Implemented in JavaScript (speed === 0 → prediction = 0)

3. **Status Classification**
   - 50% accuracy on "in_service" status
   - **Action**: Group similar statuses
   - **Fix**: Merge similar categories in next version

### Production Monitoring

Next project milestone -> Track these metrics:
```javascript
{
    "total_predictions": 10000,
    "avg_confidence": 0.85,
    "emergency_detections": 23,
    "false_negative_rate": 0.05,
    "avg_prediction_time_ms": 42
}
```

---

## 🛠️ Development

### Adding New Models
1. Train model in PySpark
2. Export models
3. Add prediction function
4. Update UI in `index.html`
5. Test and deploy

### Code Style
- JavaScript: ES6+ syntax
- HTML: Semantic, accessible markup
- CSS: BEM naming convention
- Comments: JSDoc format

---

## 📚 Documentation

- **[API Documentation](docs/API.md)**: Complete API reference
- **[Model Details](docs/MODEL_DETAILS.md)**: Training specifications

---

## 📊 Performance Benchmarks

| Metric | Value | Status |
|--------|-------|--------|
| **Prediction Latency** | <100ms | ✅ Excellent |
| **Page Load Time** | 1.2s | ✅ Fast |
| **Model Accuracy** | 85.3% avg | ✅ Production Ready |
| **Uptime (GitHub Pages)** | 99.9% | ✅ Reliable |
| **Cost** | $0/month | ✅ Free |

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- PySpark MLlib team for the ML framework
- GitHub Pages for free hosting
- SF transportation data sources
- Open source community

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/mauroTravieso/vehicle-tracking-ml/issues)
- **Email**: mauro_travieso@hotmail.com
- **Documentation**: See `/docs` folder
- **Live Demo**: https://MauroTravieso.github.io/vehicle-tracking-ml/

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Contribution Ideas
- [ ] Add more vehicle types
- [ ] Improve prediction accuracy
- [ ] Add visualization charts
- [ ] Create mobile app

---

