import { supabase } from "src/lib/common/supabaseClient";

export async function getPosts({ commit }) {
  // set loading
  commit("setLoading", true);

  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    commit("setError", error.message);
    return false;
  }

  // set posts data
  commit("setPosts", data);

  // set loading to false
  commit("setLoading", false);
}
