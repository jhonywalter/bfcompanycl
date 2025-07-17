/*
  # Create content management system tables

  1. New Tables
    - `content_sections`
      - `id` (uuid, primary key)
      - `section_name` (text, not null) - Identifier for the section
      - `title` (text, not null) - Main title of the section
      - `subtitle` (text, optional) - Optional subtitle
      - `content` (text, not null) - Main content/description
      - `image_url` (text, optional) - URL for section image
      - `button_text` (text, optional) - Text for call-to-action button
      - `button_url` (text, optional) - URL for call-to-action button
      - `order_index` (integer, not null) - Order of sections on the page
      - `is_active` (boolean, default true) - Whether section is visible
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `content_sections` table
    - Add policy for public read access (for website visitors)
    - Add policies for authenticated users to manage content
*/

CREATE TABLE IF NOT EXISTS content_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name text NOT NULL,
  title text NOT NULL,
  subtitle text,
  content text NOT NULL,
  image_url text,
  button_text text,
  button_url text,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;

-- Allow public read access for website visitors
CREATE POLICY "Enable read access for all users"
  ON content_sections
  FOR SELECT
  USING (is_active = true);

-- Allow authenticated users to insert content
CREATE POLICY "Enable insert for authenticated users"
  ON content_sections
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update content
CREATE POLICY "Enable update for authenticated users"
  ON content_sections
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete content
CREATE POLICY "Enable delete for authenticated users"
  ON content_sections
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert some sample content
INSERT INTO content_sections (section_name, title, subtitle, content, order_index, is_active) VALUES
('hero', 'Bienvenido a Nuestro Sitio', 'La mejor experiencia digital', 'Descubre todo lo que tenemos para ofrecerte. Nuestro equipo está dedicado a brindarte la mejor experiencia posible.', 1, true),
('about', 'Acerca de Nosotros', 'Conoce nuestra historia', 'Somos una empresa comprometida con la excelencia y la innovación. Trabajamos cada día para superar las expectativas de nuestros clientes.', 2, true),
('services', 'Nuestros Servicios', 'Lo que hacemos mejor', 'Ofrecemos una amplia gama de servicios diseñados para satisfacer todas tus necesidades. Calidad y profesionalismo en cada proyecto.', 3, true);