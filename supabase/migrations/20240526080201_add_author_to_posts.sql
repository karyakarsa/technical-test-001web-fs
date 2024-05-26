ALTER TABLE posts
ADD COLUMN author VARCHAR(255) DEFAULT 'admin';
COMMENT ON COLUMN posts.author IS 'Author of the post.';
