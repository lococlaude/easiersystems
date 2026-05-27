const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzsu_7-3WMt7nlB3B1xevJCubeVpyvxh5nibnzMg8tBEjUy4Nk4ua_5EuZbDr8XgJ-2hA/exec';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  // Manually read + parse body in case Vercel hasn't parsed it
  let data = req.body;
  if (!data || typeof data === 'string') {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      data = JSON.parse(Buffer.concat(chunks).toString());
    } catch (e) {
      data = {};
    }
  }

  const { firstName = '', businessName = '', businessType = '', phone = '', email = '', problem = '' } = data;

  const params = new URLSearchParams({ firstName, businessName, businessType, phone, email, problem });
  const url = SCRIPT_URL + '?' + params.toString();

  try {
    const response = await fetch(url, { redirect: 'follow' });
    console.log('Apps Script response:', response.status);
  } catch (err) {
    console.error('Apps Script call failed:', err.message);
  }

  return res.status(200).json({ ok: true });
};
