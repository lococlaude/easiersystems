module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { firstName, businessName, businessType, phone, email, problem } = req.body || {};

  const params = new URLSearchParams({
    firstName:    firstName    || '',
    businessName: businessName || '',
    businessType: businessType || '',
    phone:        phone        || '',
    email:        email        || '',
    problem:      problem      || ''
  });

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzsu_7-3WMt7nlB3B1xevJCubeVpyvxh5nibnzMg8tBEjUy4Nk4ua_5EuZbDr8XgJ-2hA/exec?' + params.toString();

  try {
    await fetch(scriptUrl, { redirect: 'follow' });
  } catch (e) {}

  return res.status(200).json({ ok: true });
};
