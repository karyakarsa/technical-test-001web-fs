import User from "src/lib/domain/entities/user";

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

export function setUser(state, user) {
  state.user = User.fromJson({
    ...user,
    email: user && user.user_metadata ? user.user_metadata.email : null,
  });
}

export function logout(state) {
  state.user = null;
}
