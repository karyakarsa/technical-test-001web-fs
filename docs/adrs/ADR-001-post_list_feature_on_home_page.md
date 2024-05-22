# Architectural Decision Record (ADR)

## ADR 001: Post List Feature on Home Page

**Date:** 2024-05-22

**Status:** Proposed

## Context

### Problem Statement

We need to implement a feature that displays a list of posts on the home page of our application. This feature will allow users to browse published posts. The application stack includes Supabase for the backend and Vue 2 with the Quasar framework for the frontend.

### Requirements and Constraints

- The posts should be stored in a PostgreSQL database managed by Supabase.
- Only published posts should be visible to users.
- The solution should support real-time updates when new posts are published.
- The frontend should be built using Vue 2 and the Quasar framework for a responsive and performant UI.

### Stakeholders

- **Development Team:** Responsible for implementing and maintaining the feature.
- **Product Management:** Interested in ensuring the feature meets user needs.
- **End Users:** Will interact with the post list on the home page.

## Decision

### Chosen Solution

We will create a `posts` table in the Supabase PostgreSQL database to store post data. The frontend will use Vue 2 and the Quasar framework to display the list of posts. Row-level security policies will be implemented to ensure only published posts are visible.

#### Database Schema Migration

```sql
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
```

### Alternatives Considered

- Use a different backend service (e.g., Firebase): This was rejected because we are already using Supabase for other features.
- Manually filter posts in the application code: This was rejected as it is less secure and efficient compared to using database-level policies.

### Positive Consequences

- Ensures only published posts are accessible, enhancing security.
- Leverages Supabase's real-time capabilities for live updates.
- Simplifies frontend logic by offloading filtering to the database.

### Negative Consequences

- Requires familiarity with Supabase's security policies.
- Additional complexity in managing database schema and migrations.

## Implications

### Short-term

- Immediate implementation of the posts schema and policies.
- Development of Vue 2 components to display the list of posts.

### Long-term

- Simplifies future features related to post management.
- Provides a scalable and secure solution for handling post data.

## Rationale

The chosen solution leverages the strengths of Supabase and the Quasar framework, ensuring a secure and performant implementation. The use of row-level security policies aligns with best practices for database management and enhances security.

## Implementation

### Action Plan

1. Database Migration:
   - Apply the provided SQL migration script to create the posts table and enable row-level security.
2. Frontend Development:
   - Create Vue 2 components using the Quasar framework to display the list of posts.
   - Integrate Supabase real-time updates to handle live data.

### Monitoring and Evaluation

- **Metrics**: Track the number of posts displayed, page load times, and user interactions.
- **Success Criteria**: The feature should correctly display only published posts and support real-time updates without performance degradation.

## Related Decisions

ADR 002: Post details with private contents (to be created)

## References

- [Supabase Documentation](https://supabase.com/docs/guides/cli/getting-started?queryGroups=platform&platform=npx)
- [Quasar Framework Documentation](https://v1.quasar.dev/)
