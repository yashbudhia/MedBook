/*
  # Initial Schema Setup

  1. Authentication
    - Using Supabase's built-in auth system
    - Email/password authentication enabled
    
  2. New Tables
    - `medical_records`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `date` (timestamp)
      - `type` (text)
      - `description` (text)
      - `doctor` (text)
      - `created_at` (timestamp)
      
  3. Security
    - Enable RLS on medical_records table
    - Add policies for user access
*/

CREATE TABLE medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  date timestamptz NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  doctor text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own medical records"
  ON medical_records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own medical records"
  ON medical_records
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);