# Architectural Decision Record (ADR)

## ADR 001: Post Detail Feature on PostDetail Page

**Date:** 2024-05-24

**Status:** Proposed

## Context

### Problem Statement

We need to implement a feature that displays detail post on the detail page of our application. This feature will allow users to see detail post navigate from home page when click a post. The application stack includes Supabase for the backend and Vue 2 with the Quasar framework for the frontend.

### Requirements and Constraints

- Create the blog post detail page to display Post Title, Featured Image, Description, Content
- The content SHOULD BE rendered correctly for Heading (level 1-3), paragraph, link, and basic paragraph style (bold, italic, strikeout etc) from JSON format output from EditorJS
- Should handle private content
- The solution should ensure private content is securely managed and not accessible via direct API requests by public users.
- User should be navigated to post detail page WHEN user click the post from home page posts list section.

### Stakeholders

- **Development Team:** Responsible for implementing and maintaining the feature.
- **Product Management:** Interested in ensuring the feature meets user needs.
- **End Users:** Will interact with the post detail on the detail page.

## Decision

### Chosen Solution

We will create a `protected_posts` table in the Supabase PostgreSQL database to store private content and establish a relation to the `posts` table via `posts_id`. To identify which posts have protected content, we will add a `have_protected_content` column to the `posts` table. The frontend will use Vue 2 and the Quasar framework to display the post details. Row-level security policies will be implemented to ensure that only authenticated users can access the private content.

#### Database Schema Migration

```sql
-- alter posts table
ALTER TABLE posts ADD COLUMN have_protected_content BOOLEAN;

-- create protected_posts table
CREATE TABLE protected_posts (
  id SERIAL PRIMARY KEY,
  content JSON,
  FOREIGN KEY (id) REFERENCES posts(id)
);

-- enable row level security
ALTER TABLE protected_posts ENABLE ROW LEVEL SECURITY;

-- create policy
CREATE POLICY "Enable access protected post only to auhtenticated" ON protected_posts USING (
  true
);
```

### Alternatives Considered

- Using a view table to handle protected content: This option was rejected as it is less secure and cannot prevent direct access from the public API.
- Checking if the post has protected content from code: This option was rejected because it would require hitting the Supabase API twice to get the post details.

### Positive Consequences

- Ensures only authenticated users can access the private content, enhancing security.
- Simplifies frontend logic by add column `have_protected_content` to posts table.

### Negative Consequences

- Requires familiarity with Supabase's security policies.
- Additional complexity in managing database schema and migrations.

## Implications

### Short-term

- Immediate implementation of the protected_posts schema and policies.
- Development of Vue 2 components to display post details.

### Long-term

- Simplifies future features related to post management.
- Provides a scalable and secure solution for handling post data.

## Rationale

The chosen solution leverages the strengths of Supabase and the Quasar framework, ensuring a secure and performant implementation. The use of row-level security policies aligns with best practices for database management and enhances security.

## Implementation

### Action Plan

1. Database Migration:
   - Apply the provided SQL migration script to create the protected_posts table and enable row-level security.
2. Frontend Development:
   - Create Vue 2 components using the Quasar framework to display the detail of posts.
   - Create a test to ensure that the component works properly.
   - Integrate Supabase real-time updates to handle live data.

### Monitoring and Evaluation

- **Metrics**: Track the detail of posts displayed, page load times, and user interactions.
- **Success Criteria**: The feature should correctly display only public content to unauthenticated users and additional protected content to authenticated users.

## Related Decisions

ADR 001: Post List

## References

- [Supabase Documentation](https://supabase.com/docs/guides/cli/getting-started?queryGroups=platform&platform=npx)
- [Quasar Framework Documentation](https://v1.quasar.dev/)
