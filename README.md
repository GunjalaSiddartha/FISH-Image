# FISH Microscopy Analyzer

> **Machine Learning Approach for Automated Analysis of FISH Microscopy Images**

A full-stack web application that demonstrates automated bacterial detection in FISH (Fluorescence In Situ Hybridization) microscopy images using simulated machine learning algorithms.

## Features

### Frontend
- **Modern Dashboard UI** - Clean, professional interface built with React and Tailwind CSS
- **Image Upload** - Drag-and-drop or browse to upload microscopy images
- **Real-time Analysis** - Instant image processing with loading animations
- **Results Visualization**
  - Detection status (Bacteria Detected / No Bacteria)
  - Confidence score with progress bar
  - Highlighted regions showing detected bacteria
  - Extracted features display
  - Confusion matrix visualization
- **Analysis History** - View past analyses with thumbnails and results
- **Download Reports** - Export analysis results as text files

### Backend
- **Supabase Edge Function** - Serverless API for image processing
- **Mock ML Pipeline**
  - Simulated CNN feature extraction
  - Simulated Random Forest classification
  - Analyzes image brightness, fluorescence intensity, and contrast
- **Database Storage** - All analyses saved to Supabase PostgreSQL

### ML Simulation
The system simulates a real ML pipeline by:
1. **Feature Extraction**: Analyzes fluorescence intensity, spot density, and contrast ratio
2. **Classification**: Uses weighted scoring to predict bacterial presence
3. **Confidence Scoring**: Provides realistic confidence percentages
4. **Region Detection**: Generates highlighted areas where bacteria are detected

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Supabase Edge Functions (Deno runtime)
- **Database**: Supabase PostgreSQL with Row Level Security
- **Build Tool**: Vite

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- A Supabase project (already configured in this project)

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Environment Variables**:
The `.env` file is already configured with Supabase credentials.

3. **Database**:
The database schema has been automatically created with the `analysis_history` table.

4. **Edge Function**:
The `analyze-image` edge function has been deployed and is ready to use.

### Running the Application

**Development mode**:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

**Production build**:
```bash
npm run build
npm run preview
```

## Usage

1. **Upload an Image**:
   - Drag and drop a microscopy image onto the upload area, or
   - Click "Browse Files" to select an image

2. **Analyze**:
   - Click the "Analyze Image" button
   - Wait for the analysis to complete (simulated processing time)

3. **View Results**:
   - See the detection result (Bacteria Detected / No Bacteria)
   - Review confidence score and extracted features
   - View highlighted regions on the image
   - Check the confusion matrix

4. **Download Report**:
   - Click "Download Report" to export the analysis results

5. **View History**:
   - All analyses are saved and displayed in the history panel
   - Click the trash icon to delete old analyses

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── ImageUpload.tsx       # Image upload component
│   │   ├── AnalysisResults.tsx   # Results visualization
│   │   └── AnalysisHistory.tsx   # History panel
│   ├── lib/
│   │   └── supabase.ts          # Supabase client config
│   ├── App.tsx                   # Main application
│   └── main.tsx                  # Entry point
├── supabase/
│   └── functions/
│       └── analyze-image/
│           └── index.ts          # Edge function for analysis
└── package.json
```

## How It Works

### Image Analysis Algorithm

The mock ML algorithm analyzes images using:

1. **Brightness Analysis**: Calculates average pixel brightness
2. **Fluorescence Intensity**: Measures bright pixel ratio (fluorescence markers)
3. **Contrast Detection**: Compares bright vs dark pixel distribution
4. **Scoring**: Combines metrics with weighted formula:
   - Fluorescence Intensity: 40%
   - Spot Density: 35%
   - Contrast Ratio: 25%

If the combined score exceeds the threshold (45%), bacteria are detected.

### Data Flow

1. User uploads image → Frontend converts to base64
2. Frontend sends to Edge Function via API call
3. Edge Function analyzes image and generates results
4. Results saved to Supabase database
5. Frontend displays results and updates history

## Academic Presentation Notes

This is a **demonstration system** designed for academic presentations. It:

- ✅ Shows a complete ML workflow (upload → analyze → visualize)
- ✅ Simulates CNN feature extraction and Random Forest classification
- ✅ Provides realistic confidence scores and metrics
- ✅ Includes all necessary visualizations (confusion matrix, highlighted regions)
- ✅ Demonstrates full-stack architecture

**Important**: The ML predictions are simulated using image processing algorithms, not trained neural networks. For production use, replace the mock analysis with actual trained models (TensorFlow, PyTorch, etc.).

## Future Enhancements

- Integrate real CNN models (TensorFlow.js or ONNX Runtime)
- Add batch processing for multiple images
- Implement user authentication
- Add more detailed statistics and charts
- Export results as PDF reports
- Compare multiple analyses side-by-side

## License

MIT License - Free for academic and research purposes
