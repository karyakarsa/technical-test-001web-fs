-- create posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL unique,
  description text,
  content json,
  featured_images json,
  status text default 'draft',
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone
);

-- enable row level security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- create policy
CREATE POLICY "Public users can read all published posts" ON posts USING (
  status = 'published'
);
