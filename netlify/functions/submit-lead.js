const SUPABASE_URL = 'https://fzkozgycsteoftvhqujj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6a296Z3ljc3Rlb2Z0dmhxdWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NDQxODUsImV4cCI6MjA5NDEyMDE4NX0.moRw4VDFm2zBXBlCueJrre0FXryGy_CnCn8c_oM_lq8';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method not allowed' };

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

    // 2. Send email directly via SMTP using Netlify's built-in fetch
    const emailBody = `
ליד חדש מ-Even's! 🌿

שם: ${data.name || '—'}
טלפון: ${data.phone || '—'}
מייל: ${data.email || '—'}
חברה: ${data.company || '—'}
סוג חוויה: ${data.event_category || '—'}
פירוט: ${data.event_type || '—'}
תאריך: ${data.event_date || '—'}
שעות: ${data.event_hours || '—'}
אורחים: ${data.guest_count || '—'}
הערות: ${data.notes || '—'}
הסכמה לדיוור: ${data.consent || '—'}
מקור: ${data.source || '—'}
    `;

    // Use Netlify Forms API directly with the site ID
    const formData = new URLSearchParams();
    formData.append('form-name', 'evens-lead-form');
    Object.keys(data).forEach(k => formData.append(k, data[k] || ''));

    // Submit to Netlify Forms from server side
    const netlifyRes = await fetch('https://evens1.netlify.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Netlify-Function'
      },
      body: formData.toString()
    });

    console.log('Netlify Forms status:', netlifyRes.status);

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
