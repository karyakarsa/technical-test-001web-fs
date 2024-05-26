import { supabase } from "src/lib/common/supabaseClient";
import axios from "axios";

export async function getPosts({ commit }) {
  // set loading
  commit("setLoading", true);

  const supabaseUrl = process.env.SUPABASE_URL;
  try {
    const result = await axios.post(`${supabaseUrl}/functions/v1/post-list`, {  }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
    });

    // set posts data
    commit("setPosts", result.data);
  } catch (error) {
    if (error) {
      commit("setError", error.message);
      return false;
    }
  } finally {
    // set loading to false
    commit("setLoading", false);
  }


}

export async function getPostBySlug({ commit, rootState, rootGetters }, slug) {
  // set loading
  commit("setLoading", true);

  const supabaseUrl = process.env.SUPABASE_URL;

  try {
    const result = await axios.post(`${supabaseUrl}/functions/v1/post-detail`, { slug }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        "accesstoken": rootState.auth.accessToken,
      },
    });
    // handle successful response
    // set post data
    return commit("setPost", result.data);
  } catch (error) {
    // handle error
    commit("setError", error.message);
    return false;
  } finally {
    // set loading to false
    commit("setLoading", false);
  }
}
