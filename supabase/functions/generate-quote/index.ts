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

    // Default price list for waste management services
    const defaultPriceList = JSON.stringify({
      "services": {
        "hoarding_cleanup": {
          "base_rate": 150,
          "per_hour": 85,
          "description": "Hoarding remediation and cleanup"
        },
        "junk_removal": {
          "base_rate": 100,
          "per_cubic_yard": 75,
          "description": "General junk and debris removal"
        },
        "furniture_removal": {
          "small_item": 50,
          "large_item": 100,
          "description": "Furniture and appliance removal"
        },
        "appliance_removal": {
          "small": 60,
          "large": 120,
          "description": "Appliance disposal"
        },
        "estate_cleanout": {
          "base_rate": 200,
          "per_room": 100,
          "description": "Complete estate cleanout"
        },
        "recycling": {
          "base_rate": 50,
          "per_load": 40,
          "description": "Recycling and eco-friendly disposal"
        },
        "hazmat_disposal": {
          "base_rate": 250,
          "per_item": 75,
          "description": "Hazardous material disposal"
        },
        "labor": {
          "per_hour": 75,
          "minimum_hours": 2,
          "description": "Additional labor"
        },
        "disposal_fees": {
          "per_ton": 60,
          "description": "Landfill disposal fees"
        }
      }
    });

    // Create new FormData for the AI server
    const aiFormData = new FormData();
    
    // Add all images
    for (const image of images) {
      aiFormData.append('images', image);
    }
    
    // Add price list
    aiFormData.append('priceList', defaultPriceList);
    
    // Add prompt extras specific to Urge to Purge
    aiFormData.append('promptExtras', 'Company: Urge to Purge - Professional waste management and disposal services. Provide detailed breakdown of items visible and estimated removal costs.');

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
