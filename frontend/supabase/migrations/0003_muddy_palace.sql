/*
  # Add Medical Records Storage Support

  1. New Tables
    - Enable storage for medical records
    - Add tracking for uploaded files

  2. Security
    - Enable RLS for uploaded files
    - Add policies for user access
*/

-- Enable storage
INSERT INTO storage.buckets (id, name)
VALUES ('records', 'Medical Records Storage')
ON CONFLICT DO NOTHING;

-- Add RLS policy for storage
CREATE POLICY "Users can upload their own medical records"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'records' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can read their own medical records"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'records' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Add table for tracking uploaded files
CREATE TABLE uploaded_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  file_path text NOT NULL,
  file_name text NOT NULL,
  file_type text NOT NULL,
  status text NOT NULL DEFAULT 'processing',
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own uploaded files"
ON uploaded_files
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own files"
ON uploaded_files
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);