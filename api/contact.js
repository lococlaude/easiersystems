const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, businessName, businessType, phone, email, problem } = req.body || {};

  try {
    await resend.emails.send({
      from: 'Easier Systems <onboarding@resend.dev>',
      to: 'tom.flores1000@gmail.com',
      subject: 'New Audit Request — ' + (businessName || 'Unknown'),
      text: [
        'New lead from Easier Systems:\n',
        'Name:     ' + (firstName    || '—'),
        'Business: ' + (businessName || '—'),
        'Type:     ' + (businessType || '—'),
        'Phone:    ' + (phone        || '—'),
        'Email:    ' + (email        || '—'),
        'Problem:\n' + (problem      || '—')
      ].join('\n')
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send' });
  }
};
