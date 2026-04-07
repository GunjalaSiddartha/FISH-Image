import { CheckCircle, XCircle, Activity, Download } from 'lucide-react';

interface AnalysisResultsProps {
  result: {
    prediction: string;
    confidence: number;
    features: string[];
    highlightedRegions: Array<{ x: number; y: number; width: number; height: number }>;
  } | null;
  imageData: string | null;
}

export function AnalysisResults({ result, imageData }: AnalysisResultsProps) {
  if (!result) return null;

  const isBacteriaDetected = result.prediction === 'Bacteria Detected';

  const downloadReport = () => {
    const report = `
FISH Microscopy Analysis Report
================================

Analysis Date: ${new Date().toLocaleString()}

RESULT: ${result.prediction}
Confidence: ${result.confidence}%

EXTRACTED FEATURES:
${result.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

ALGORITHM: Simulated CNN + Random Forest
Processing Time: ${(Math.random() * 2 + 1).toFixed(2)}s

CONFUSION MATRIX (Simulated):
              Predicted Positive  Predicted Negative
Actual Positive      92%               8%
Actual Negative       5%              95%

Note: This is a demonstration system using simulated ML predictions.
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fish-analysis-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
        <button
          onClick={downloadReport}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div
            className={`p-6 rounded-lg mb-6 ${
              isBacteriaDetected
                ? 'bg-red-50 border-2 border-red-200'
                : 'bg-green-50 border-2 border-green-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              {isBacteriaDetected ? (
                <XCircle className="w-8 h-8 text-red-600" />
              ) : (
                <CheckCircle className="w-8 h-8 text-green-600" />
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {result.prediction}
                </h3>
                <p className="text-sm text-gray-600">
                  Classification Result
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Confidence Score
              </span>
              <span className="text-lg font-bold text-blue-600">
                {result.confidence}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  result.confidence > 80
                    ? 'bg-green-500'
                    : result.confidence > 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Extracted Features
            </h4>
            <ul className="space-y-2">
              {result.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          {imageData && (
            <div className="relative rounded-lg overflow-hidden bg-gray-100">
              <img
                src={imageData}
                alt="Analyzed image"
                className="w-full h-auto"
              />
              {isBacteriaDetected &&
                result.highlightedRegions.map((region, index) => (
                  <div
                    key={index}
                    className="absolute border-2 border-red-500 bg-red-500 bg-opacity-20 animate-pulse"
                    style={{
                      left: `${region.x}%`,
                      top: `${region.y}%`,
                      width: `${region.width}%`,
                      height: `${region.height}%`,
                    }}
                  />
                ))}
            </div>
          )}

          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Confusion Matrix (Simulated)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-100 p-3 rounded text-center">
                <div className="font-bold text-green-700">92%</div>
                <div className="text-gray-600">True Positive</div>
              </div>
              <div className="bg-red-100 p-3 rounded text-center">
                <div className="font-bold text-red-700">8%</div>
                <div className="text-gray-600">False Negative</div>
              </div>
              <div className="bg-red-100 p-3 rounded text-center">
                <div className="font-bold text-red-700">5%</div>
                <div className="text-gray-600">False Positive</div>
              </div>
              <div className="bg-green-100 p-3 rounded text-center">
                <div className="font-bold text-green-700">95%</div>
                <div className="text-gray-600">True Negative</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Accuracy: 93.5% | F1-Score: 0.92
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
