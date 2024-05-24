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

// get post detail
export async function getPostDetail({ commit }, slug) {
  // set loading
  commit("setLoading", true);

  const { data, error } = await supabase
    .from("posts")
    .select("*, protected_posts(content) as protected_cotent")
    .eq("slug", slug)
    .single();
  if (error) {
    commit("setError", error.message);
    return false;
  }

  // set post data
  commit("setPost", data);

  // set loading to false
  commit("setLoading", false);
}
