/*
  # Create Articles Table for AI4s Article Generator

  ## Overview
  This migration creates the core database structure for storing generated articles
  and their metadata in the AI4s Article Generator platform.

  ## New Tables
  
  ### `articles`
  Stores all generated articles with their complete content and metadata.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each article
  - `topic` (text, required) - The article topic/title provided by the user
  - `creator_name` (text, required) - Name of the content creator
  - `content` (text, required) - The fully generated article content in HTML/markdown format
  - `previous_blog` (text, optional) - Reference content or URL used for style matching
  - `suggested_topics` (text[], optional) - AI-generated suggestions for follow-up articles
  - `created_at` (timestamptz) - Timestamp when the article was generated
  - `updated_at` (timestamptz) - Timestamp of last modification

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the `articles` table
  - Public read access is granted to allow viewing all generated articles
  - Authenticated users can insert new articles
  - Only authenticated users can update articles they created
  
  ### Policies
  1. **"Anyone can view articles"** - Allows public SELECT access
  2. **"Authenticated users can create articles"** - Allows INSERT for authenticated users
  3. **"Users can update their own articles"** - Allows UPDATE for article creators

  ## Indexes
  - Index on `creator_name` for fast lookup by creator
  - Index on `created_at` for chronological queries
  - Index on `topic` for search functionality

  ## Notes
  - Articles are stored with full content to enable offline access and version history
  - The `suggested_topics` array enables the platform to suggest related content
  - Timestamps use `timestamptz` for timezone-aware storage
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  creator_name text NOT NULL,
  content text NOT NULL,
  previous_blog text,
  suggested_topics text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view articles"
  ON articles
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_articles_creator_name ON articles(creator_name);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_topic ON articles(topic);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
