import { Upload, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface ImageUploadProps {
  onImageSelect: (imageData: string, imageName: string) => void;
  selectedImage: string | null;
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
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">
            Drag and drop your microscopy image here
          </p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
            Browse Files
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
          <p className="text-xs text-gray-400 mt-4">
            Supported formats: JPG, PNG, TIFF
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            <img
              src={selectedImage}
              alt="Selected microscopy image"
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
          <button
            onClick={() => onImageSelect('', '')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
}
