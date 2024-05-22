import { supabase } from "src/lib/common/supabaseClient";

export async function sendMagicLink({ commit }, email) {
  commit("setLoading", true);

  // get redirect url to origin
  const emailRedirectTo = window.location.origin;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo,
    },
  });
  if (error) {
    commit("setError", error.message);
    return false;
  }

  commit("setLoading", false);

  return true;
}

export async function logout({ commit }) {
  commit("setLoading", true);

  const { error } = await supabase.auth.signOut();
  if (error) {
    commit("setError", error.message);
    return false;
  }

  commit("logout");
  commit("setLoading", false);
}
