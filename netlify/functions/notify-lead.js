exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method not allowed' };

  try {
    const body = event.body;
    
    // Forward to Google Apps Script
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbweE3fyVXn-rSi7c68swOjyg_bi95H_TvW66o5sP0R6AHEMjDvreuTH-YwtCfjaXsLq/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
        redirect: 'follow'
      }
    );

    const text = await response.text();
    console.log('Apps Script response:', text);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, response: text })
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
