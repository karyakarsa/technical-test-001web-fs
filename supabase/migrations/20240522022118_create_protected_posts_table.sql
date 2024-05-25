-- alter posts table
ALTER TABLE posts
ADD COLUMN have_protected_content BOOLEAN;
-- create protected_posts table
CREATE TABLE protected_posts (
  id SERIAL PRIMARY KEY,
  content JSON,
  FOREIGN KEY (id) REFERENCES posts(id)
);
-- enable row level security
ALTER TABLE protected_posts ENABLE ROW LEVEL SECURITY;
-- create policy
CREATE POLICY "Enable access protected post only to auhtenticated" ON protected_posts TO authenticated USING (true);
