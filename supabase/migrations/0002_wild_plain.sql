/*
  # Add User Metadata and Role Management

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `role` (text)
      - `full_name` (text)
      - `specialization` (text, nullable)
      - `license_number` (text, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on user_profiles table
    - Add policies for user access
*/

CREATE TABLE user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role text NOT NULL CHECK (role IN ('doctor', 'patient')),
  full_name text NOT NULL,
  specialization text,
  license_number text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_doctor_fields CHECK (
    (role = 'doctor' AND specialization IS NOT NULL AND license_number IS NOT NULL) OR
    (role = 'patient' AND specialization IS NULL AND license_number IS NULL)
  )
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);