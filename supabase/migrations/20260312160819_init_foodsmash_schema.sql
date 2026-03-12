-- Create the foodsmash schema
CREATE SCHEMA IF NOT EXISTS foodsmash;

-- Create the combos table
CREATE TABLE foodsmash.combos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  food_one text NOT NULL,
  food_two text NOT NULL,
  description text NOT NULL,
  tags text[] DEFAULT '{}'::text[],
  rating integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on the table
ALTER TABLE foodsmash.combos ENABLE ROW LEVEL SECURITY;

-- Allow public read access to combos
CREATE POLICY "Allow public read access to combos"
ON foodsmash.combos
FOR SELECT
TO public
USING (true);

-- Allow public insert access to combos (for MVP)
CREATE POLICY "Allow public insert access to combos"
ON foodsmash.combos
FOR INSERT
TO public
WITH CHECK (true);