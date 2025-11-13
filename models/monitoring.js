// monitoring.js
class ModelMonitor {
    constructor() {
        this.predictions = [];
        this.metrics = {
            total_predictions: 0,
            emergency_detections: 0,
            avg_confidence: 0
        };
    }

    logPrediction(modelType, input, output, timestamp) {
        this.predictions.push({
            model: modelType,
            input: input,
            output: output,
            timestamp: timestamp || new Date().toISOString()
        });
        
        this.updateMetrics();
    }

    updateMetrics() {
        this.metrics.total_predictions = this.predictions.length;
        this.metrics.emergency_detections = this.predictions.filter(
            p => p.model === 'emergency' && p.output.prediction === 1
        ).length;
        
        const confidences = this.predictions
            .filter(p => p.output.confidence)
            .map(p => p.output.confidence);
        
        this.metrics.avg_confidence = confidences.length > 0
            ? confidences.reduce((a, b) => a + b, 0) / confidences.length
            : 0;
    }

    exportMetrics() {
        return {
            ...this.metrics,
            last_updated: new Date().toISOString(),
            predictions_sample: this.predictions.slice(-10)
        };
    }
}
