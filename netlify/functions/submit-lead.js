const https = require('https');

const SUPABASE_URL = 'https://fzkozgycsteoftvhqujj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6a296Z3ljc3Rlb2Z0dmhxdWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NDQxODUsImV4cCI6MjA5NDEyMDE4NX0.moRw4VDFm2zBXBlCueJrre0FXryGy_CnCn8c_oM_lq8';

exports.handler = async (event) => {
  // Allow CORS from any origin (including Wix)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method not allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    // 1. Save to Supabase
    await fetch(SUPABASE_URL + '/rest/v1/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });

    // 2. Send email via Netlify Forms
    const formBody = new URLSearchParams({
      'form-name': 'evens-lead-form',
      ...data
    });

    await fetch('https://evens1.netlify.app/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody.toString()
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
