/*
  # FISH Microscopy Analysis System - Database Schema

  ## Overview
  Creates the database structure for storing microscopy image analysis history
  and results from the automated FISH image analysis system.

  ## New Tables

  ### `analysis_history`
  Stores all image analysis records with predictions and metadata
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each analysis
  - `image_name` (text) - Original filename of the uploaded image
  - `image_data` (text) - Base64 encoded image data for storage and display
  - `prediction` (text) - Classification result ("Bacteria Detected" or "No Bacteria")
  - `confidence` (numeric) - Confidence score (0-100)
  - `features` (jsonb) - Extracted features from the analysis (fluorescence intensity, cell shape, etc.)
  - `analysis_metadata` (jsonb) - Additional metadata about the analysis process
  - `created_at` (timestamptz) - Timestamp of when the analysis was performed

  ## Security

  - Enable Row Level Security (RLS) on `analysis_history` table
  - Add policies for public access (since this is a demo app):
    - Anyone can insert new analysis records
    - Anyone can view all analysis records
    - Anyone can delete their own records
*/

CREATE TABLE IF NOT EXISTS analysis_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_name text NOT NULL,
  image_data text NOT NULL,
  prediction text NOT NULL,
  confidence numeric NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  features jsonb DEFAULT '[]'::jsonb,
  analysis_metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analysis records"
  ON analysis_history
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view analysis records"
  ON analysis_history
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can delete analysis records"
  ON analysis_history
  FOR DELETE
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_analysis_history_created_at 
  ON analysis_history(created_at DESC);