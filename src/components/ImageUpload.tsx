import { Upload } from 'lucide-react';
import { useState } from 'react';

interface ImageUploadProps {
  onImageSelect: (imageData: string, imageName: string) => void;
  selectedImage: string | null;
}

function BacteriaBg() {
  const bacteria = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 20,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {bacteria.map((b) => (
        <div key={b.id} className="absolute pointer-events-none">
          <svg
            width={b.size}
            height={b.size}
            viewBox="0 0 100 100"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              opacity: 0.15,
              animation: `float ${b.duration}s infinite ease-in-out`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
              }
            `}</style>
            <ellipse cx="50" cy="35" rx="35" ry="20" fill="currentColor" className="text-blue-400" />
            <circle cx="30" cy="50" r="8" fill="currentColor" className="text-blue-500" />
            <circle cx="70" cy="50" r="8" fill="currentColor" className="text-blue-500" />
            <path d="M 20 55 Q 15 65 10 70" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-400" />
            <path d="M 80 55 Q 85 65 90 70" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-400" />
            <path d="M 40 60 L 35 75" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-blue-300" />
            <path d="M 60 60 L 65 75" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-blue-300" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function ImageUpload({ onImageSelect, selectedImage }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelect(result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload FISH Image</h2>

      {!selectedImage ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all overflow-hidden min-h-80 ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 bg-gradient-to-br from-slate-50 to-blue-50'
          }`}
        >
          <BacteriaBg />

          <div className="relative z-10">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full opacity-10 blur-xl animate-pulse"></div>
                <div className="relative bg-blue-100 p-4 rounded-full">
                  <Upload className="w-16 h-16 text-blue-600" />
                </div>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mb-2 text-lg">
              Upload Your FISH Image
            </p>
            <p className="text-gray-600 mb-4">
              Drag and drop your microscopy image here
            </p>
            <p className="text-sm text-gray-500 mb-6">or</p>
            <label className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg cursor-pointer hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105">
              <span className="font-medium">Browse Files</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileChange(file);
                }}
              />
            </label>
            <p className="text-xs text-gray-500 mt-6">
              Supported formats: JPG, PNG, TIFF
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
            <img
              src={selectedImage}
              alt="Selected microscopy image"
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
          <button
            onClick={() => onImageSelect('', '')}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-red-50 hover:border-red-300 transition-colors font-medium"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
}
