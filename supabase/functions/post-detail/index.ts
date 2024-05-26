// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
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

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/post-detail' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
