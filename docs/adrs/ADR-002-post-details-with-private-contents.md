# Architectural Decision Record (ADR)

## ADR 002: Post details with private contents

**Date:** 2024-05-26

**Status:** Proposed

## Context

### Problem Statement

We need to implement a feature that display detail of post, user will click the post from list of posts on home page. This feature will allow to see detail of post, it show title, publishing information (author, published date), and content. But not every post should be public view, so we need to implement private feature. Private post will show preview content, for more content user need to login.

### Requirements and Constraints

- Implement post detail page that navigated from list of posts
- Route post detail should be use slug instead of id
- The posts table need to be update for flag which post should be private
- The posts table need to be update for add author field
- Private content is not accessible via direct API requests from unauthenticated users to maintain content security.
- The backend should be make additional endpoint for fetch detail post API

### Stakeholders

- **Development Team:** Responsible for implementing and maintaining the feature.
- **Product Management:** Interested in ensuring the feature meets user needs.
- **End Users:** Will interact with the post list on the home page.

## Decision

### Chosen Solution

- We should update `posts` table in the Supabase PostgreSQL database. Column for representing private content is `exclusive`. Also don't forget to add `author` column. Seed should be updated for test private content feature

#### Database Migration
Migrations
```sql
ALTER TABLE posts ADD COLUMN exclusive BOOLEAN DEFAULT false;
COMMENT ON COLUMN posts.exclusive IS 'Exclusive post content flag. If true, users can only see a preview of the content and need to login for full access.';

ALTER TABLE posts
ADD COLUMN author VARCHAR(255) DEFAULT 'admin';
COMMENT ON COLUMN posts.author IS 'Author of the post.';

```
Seed
```sql
-- posts data dummies
INSERT INTO posts (title, slug, description, status,content, featured_images, published_at, created_at) VALUES
('Post 1', 'post-1', 'Aenean sed rutrum nisl, nec aliquet ipsum.', 'published', '{"time":1716351530201,"blocks":[{"id":"Y7V0YvZ1_b","type":"header","data":{"text":"A Lorem Ipsum","level":1}},{"id":"HzWvdm1GuP","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}}],"version":"2.26.5"}', '{"128": "https://picsum.photos/128/128", "256": "https://picsum.photos/256/256", "512": "https://picsum.photos/512/512", "1024": "https://picsum.photos/1024/1024"}', NOW(), NOW()),
('Post 2', 'post-2', 'Sed accumsan purus sed porta imperdiet.','published', '{"time":1716351530201,"blocks":[{"id":"Y7V0YvZ1_b","type":"header","data":{"text":"A Lorem Ipsum","level":1}},{"id":"HzWvdm1GuP","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}},{"id":"r64wdNoQjG","type":"link","data":{"link":"https://codex.so","meta":{"title":"CodeX Team","site_name":"CodeX","description":"Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.","image":{"url":"https://codex.so/public/app/img/meta_img.png"}}}}],"version":"2.26.5"}', '{"128": "https://picsum.photos/128/128", "256": "https://picsum.photos/256/256", "512": "https://picsum.photos/512/512", "1024": "https://picsum.photos/1024/1024"}', NOW(), NOW()),
('Post 3', 'post-3', 'Quisque vitae tincidunt quam.', 'published', '{"time":1716351530201,"blocks":[{"id":"Y7V0YvZ1_b","type":"header","data":{"text":"A Lorem Ipsum","level":1}},{"id":"HzWvdm1GuP","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}}],"version":"2.26.5"}', '{"128": "https://picsum.photos/128/128", "256": "https://picsum.photos/256/256", "512": "https://picsum.photos/512/512", "1024": "https://picsum.photos/1024/1024"}', NOW(), NOW()),
('Post 4', 'post-4', 'Nam congue nisl libero, vel fringilla dolor venenatis at.', 'published', '{"time":1716351530201,"blocks":[{"id":"Y7V0YvZ1_b","type":"header","data":{"text":"A Lorem Ipsum","level":1}},{"id":"HzWvdm1GuP","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}},{"id":"DlOb0THkIG","type":"paragraph","data":{"text":"Vestibulum ut tincidunt libero. Ut vitae porta nulla. Suspendisse a nibh malesuada, sollicitudin lectus porta, euismod dolor. Nunc sit amet consectetur dui. In hac habitasse platea dictumst."}},{"id":"vvhLZI3y7g","type":"paragraph","data":{"text":"Aenean ligula sapien, fringilla id mi et, tempor pellentesque ligula. Sed luctus libero vel mattis tincidunt. Nunc massa erat, gravida sed magna eu, congue interdum quam."}},{"id":"3Z6Z1Z1Z1Z","type":"paragraph","data":{"text":"Sed nec nunc nec nunc. Nullam auctor, nunc nec tincidunt lacinia"}}],"version":"2.26.5"}', '{"128": "https://picsum.photos/128/128", "256": "https://picsum.photos/256/256", "512": "https://picsum.photos/512/512", "1024": "https://picsum.photos/1024/1024"}', NOW(), NOW()),
('Post 5', 'post-5', 'Pellentesque eget turpis risus. Duis nec sollicitudin enim, nec faucibus metus', 'published', '{"time":1716351530201,"blocks":[{"id":"Y7V0YvZ1_b","type":"header","data":{"text":"A Lorem Ipsum","level":2}},{"id":"HzWvdm1GuP","type":"paragraph","data":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <b>eiusmod</b> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea <i><b>commodo</b></i> consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}},{"id":"DlOb0THkIG","type":"paragraph","data":{"text":"Vestibulum ut tincidunt libero. Ut vitae porta nulla. Suspendisse a nibh malesuada, sollicitudin lectus porta, euismod dolor. Nunc sit amet consectetur dui. In hac habitasse platea dictumst."}},{"id":"vvhLZI3y7g","type":"paragraph","data":{"text":"Aenean ligula sapien, fringilla id mi et, tempor pellentesque ligula. Sed luctus libero vel mattis tincidunt. Nunc massa erat, gravida sed magna eu, congue interdum quam."}},{"id":"r64wdNoQjG","type":"link","data":{"link":"https://codex.so","meta":{"title":"CodeX Team","site_name":"CodeX","description":"Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.","image":{"url":"https://codex.so/public/app/img/meta_img.png"}}}},{"id":"Y7V0YvZ1_c","type":"header","data":{"text":"A dolor sit amet","level":1}},{"id":"3Z6Z1Z1Z1Z","type":"paragraph","data":{"text":"Sed nec nunc nec nunc. Nullam auctor, nunc nec tincidunt lacinia"}}],"version":"2.26.5"}', '{"128": "https://picsum.photos/128/128", "256": "https://picsum.photos/256/256", "512": "https://picsum.photos/512/512", "1024": "https://picsum.photos/1024/1024"}', NOW(), NOW());

-- Set exclusive to true for post-3 and post-5
UPDATE posts SET exclusive = true where slug IN('post-3', 'post-5');

```

- Make edge functions for fetch the detail post data, make sure to select column that needed don't over fetch. For preview private content that use some logic to only get several content block when user not authenticated

#### Edge function post detail

``` ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
}

Deno.serve(async (req) => {
  // cors options handling
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { slug } = await req.json()

  // authenticate user from accesstoken header. Using accesstoken header because Authorization header already reserve by supabase
  const accesstoken = req.headers.get('accesstoken')
  let user = null;
  if (accesstoken) {
    const { data } = await supabaseClient.auth.getUser(accesstoken)
    user = data
  }

  // fetch data by slug necessary data from supabase
  const {data: result, error} = await supabaseClient
  .from('posts')
  .select('slug, author, title, content, published_at, exclusive, featured_images')
  .eq('slug', slug)
  .single()

  // when post not found return error
  if (!result) {
    return new Response(JSON.stringify({ error: 'Post not found' }), {
      headers: { ...corsHeaders,'Content-Type': 'application/json' },
      status: 404,
    })
  }

  const {  exclusive, ...responseData } = result

  // if post is exclusive and user not logged in, return only first 2 blocks
  const needLogin = exclusive && !user
  if(needLogin)
    responseData.content.blocks = responseData.content.blocks.filter((block) => ['paragraph','header'].includes(block.type)).slice(0, 2)


  return new Response(JSON.stringify({ ...responseData, needLogin }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
})
```

- Change implementation list of posts using edge function. Because using supabase direct query can reveal how to query into database and over fetch (can be take a look from network call, you can query through API query strings). Using edge function will prevent that, response from function only necessary field, content will be still private.

#### Edge function post list
```ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
)


const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
}
Deno.serve(async (req) => {
  // cors options handling
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  // fetch data by slug necessary data from supabase
  const { data, error } = await supabaseClient
  .from("posts")
  .select("slug, title, description, featured_images, published_at");
  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  )
})
```

### Alternatives Considered

- Using supabase direct query and map results in frontend side.
- Overfetching result can be resolve with change the select query, but query will appear in network call led to data leak.

### Positive Consequences

- Preventing overfetch
- Make sure private content only show preview.
- Leverages Supabase edge function for create quick API

### Negative Consequences

- Need backend to make API instead of frontend can use direct query
- Additional complexity for get post data.

## Implications

### Short-term

- Changing how to fetch data. It add extra steps

### Long-term

- More secure data fetch

## Rationale

- The chosen solution leverages the strengths of Supabase edge function for create quick API, ensuring a secure data fetching.

## Implementation

### Action Plan

1. Database migrations:
   - Alter table for adding `exclusive` and `author` columns
2. Backend development:
   - Make post detail API using edge function
   - Make list of post API using edge function
3. Frontend development:
   - Create new vue component to display post detail page
   - Implement API post detail and list of post from edge function


### Monitoring and Evaluation

- **Metrics**: Track the number of posts displayed, page load times, and user interactions.
- **Success Criteria**: The feature should correctly display preview content when the post is private and use unauthenticated.

## Related Decisions


## References

- [Supabase Documentation](https://supabase.com/docs/guides/functions)

---

**Author:** Ala Rai Abdiallah

**Team:**
