import { useState } from 'react';
import { Microscope, Loader2 } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { AnalysisResults } from './components/AnalysisResults';
import { AnalysisHistory } from './components/AnalysisHistory';

interface AnalysisResult {
  prediction: string;
  confidence: number;
  features: string[];
  highlightedRegions: Array<{ x: number; y: number; width: number; height: number }>;
}

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleImageSelect = (imageData: string, name: string) => {
    setSelectedImage(imageData);
    setImageName(name);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !imageName) return;

    setAnalyzing(true);
    setResult(null);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-image`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          imageData: selectedImage,
          imageName: imageName,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();

      setTimeout(() => {
        setResult(data);
        setAnalyzing(false);
        setRefreshTrigger(prev => prev + 1);
      }, 1500);

    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalyzing(false);
      alert('Failed to analyze image. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Microscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                FISH Microscopy Analyzer
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Automated Bacterial Detection using Machine Learning
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
            />

            {selectedImage && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className={`w-full py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-3 ${
                    analyzing
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-[1.02]'
                  }`}
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Microscope className="w-5 h-5" />
                      Analyze Image
                    </>
                  )}
                </button>

                {analyzing && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Processing image...</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '25%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Running CNN feature extraction and Random Forest classification...
                    </p>
                  </div>
                )}
              </div>
            )}

            {result && (
              <AnalysisResults result={result} imageData={selectedImage} />
            )}
          </div>

          <div className="lg:col-span-1">
            <AnalysisHistory refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            FISH Microscopy Analyzer - Demo System for Academic Presentation
          </p>
          <p className="text-center text-xs text-gray-400 mt-1">
            Simulated ML predictions using CNN + Random Forest algorithms
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
