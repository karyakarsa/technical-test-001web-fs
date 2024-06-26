import Post from "src/lib/domain/entities/post";

export function setPosts(state, posts) {
  state.posts =
    posts && posts.length > 0 ? posts.map((post) => Post.fromJson(post)) : [];
}

export function setLoading(state, loading) {
  if (loading) {
    // when loading, reset error message
    state.error = null;
  }

  state.loading = loading;
}

export function setError(state, error) {
  state.error = error;
}
