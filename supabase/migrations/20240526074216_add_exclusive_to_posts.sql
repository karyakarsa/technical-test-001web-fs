ALTER TABLE posts ADD COLUMN exclusive BOOLEAN DEFAULT false;
COMMENT ON COLUMN posts.exclusive IS 'Exclusive post content flag. If true, users can only see a preview of the content and need to login for full access.';
