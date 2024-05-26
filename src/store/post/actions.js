import { supabase } from "src/lib/common/supabaseClient";
import axios from "axios";

export async function getPosts({ commit }) {
  // set loading
  commit("setLoading", true);

  const { data, error } = await supabase
  .from("posts")
  .select("slug, title, description, featured_images, published_at");
  if (error) {
    commit("setError", error.message);
    return false;
  }

  // set posts data
  commit("setPosts", data);

  // set loading to false
  commit("setLoading", false);
}

export async function getPostBySlug({ commit, rootState, rootGetters }, slug) {
  // set loading
  commit("setLoading", true);
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  // const { data, error } = await supabase
  //   .from("posts")
  //   .select("*")
  //   .eq("slug", slug)
  //   .single();

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
    console.log(result)
    return commit("setPost", result.data);
  } catch (error) {
    // handle error
    console.log("catch error",error.message)
    commit("setError", error.message);
    return false;
  } finally {
    // set loading to false
    commit("setLoading", false);
  }



  // if (error) {
  //   commit("setError", error.message);
  //   return false;
  // }

  // // set posts data
  // commit("setPost", data);

  // // set loading to false
  // commit("setLoading", false);
}
