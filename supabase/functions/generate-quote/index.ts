import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOCAL_AI_SERVER_URL = Deno.env.get('LOCAL_AI_SERVER_URL');
    
    if (!LOCAL_AI_SERVER_URL) {
      console.error('LOCAL_AI_SERVER_URL not configured');
      return new Response(
        JSON.stringify({ error: 'AI server not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating quote with local AI server');

    // Parse the multipart form data
    const formData = await req.formData();
    const images = formData.getAll('images') as File[];

    if (!images || images.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No images provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing ${images.length} images`);

    // Get price list from database
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const priceListResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/price_list?select=*`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        }
      }
    );
    
    if (!priceListResponse.ok) {
      console.error('Failed to fetch price list');
      return new Response(
        JSON.stringify({ error: 'Failed to fetch price list' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const priceListData = await priceListResponse.json();
    
    // Convert database format to the format expected by AI server
    const services: any = {};
    for (const item of priceListData) {
      const serviceData: any = {
        description: item.description || item.service_name
      };
      
      if (item.base_rate) serviceData.base_rate = item.base_rate;
      if (item.per_hour) serviceData.per_hour = item.per_hour;
      if (item.per_item) serviceData.per_item = item.per_item;
      if (item.per_cubic_yard) serviceData.per_cubic_yard = item.per_cubic_yard;
      if (item.per_room) serviceData.per_room = item.per_room;
      if (item.per_load) serviceData.per_load = item.per_load;
      if (item.per_ton) serviceData.per_ton = item.per_ton;
      if (item.small_item) serviceData.small_item = item.small_item;
      if (item.large_item) serviceData.large_item = item.large_item;
      if (item.minimum_hours) serviceData.minimum_hours = item.minimum_hours;
      
      services[item.service_key] = serviceData;
    }
    
    const priceList = JSON.stringify({ services });
    console.log('Price list loaded from database');
    
    // Get AI prompt from database
    const promptResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/ai_prompts?prompt_key=eq.quote_generation&select=prompt_text`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        }
      }
    );
    
    let promptExtras = 'Company: Urge to Purge - Professional waste management and disposal services. Provide detailed breakdown of items visible and estimated removal costs.';
    
    if (promptResponse.ok) {
      const promptData = await promptResponse.json();
      if (promptData && promptData.length > 0) {
        promptExtras = promptData[0].prompt_text;
        console.log('AI prompt loaded from database');
      }
    }

    // Create new FormData for the AI server
    const aiFormData = new FormData();
    
    // Add all images
    for (const image of images) {
      aiFormData.append('images', image);
    }
    
    // Add price list from database
    aiFormData.append('priceList', priceList);
    
    // Add prompt extras from database
    aiFormData.append('promptExtras', promptExtras);

    // Forward to local AI server
    const aiServerUrl = LOCAL_AI_SERVER_URL.endsWith('/') 
      ? `${LOCAL_AI_SERVER_URL}api/quote`
      : `${LOCAL_AI_SERVER_URL}/api/quote`;

    console.log(`Forwarding request to: ${aiServerUrl}`);

    const aiResponse = await fetch(aiServerUrl, {
      method: 'POST',
      body: aiFormData,
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI server error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate quote from AI server' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await aiResponse.json();
    console.log('Quote generated successfully');

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-quote:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
