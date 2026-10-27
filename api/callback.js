module.exports = async (req, res) => {
  const { code } = req.query;
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  if (!code) return res.status(400).send('No code provided');
  if (!clientId || !clientSecret) return res.status(500).send('Missing credentials');
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error_description || data.error);
    const message = 'authorization:github:success:{"token":"' + data.access_token + '","provider":"github"}';
    const html = '<html><body><script>window.opener.postMessage(' + JSON.stringify(message) + ', "*"); window.close();</script></body></html>';
    res.send(html);
  } catch (error) {
    res.status(500).send("OAuth Error: " + error.message);
  }
};