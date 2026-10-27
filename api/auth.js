module.exports = (req, res) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) return res.status(500).send('Missing OAUTH_GITHUB_CLIENT_ID in Vercel');
  
  const redirectUri = 'https://mindfulroom.vercel.app/api/callback';
  const state = req.query.site_id || 'mindfulroom.vercel.app';
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user&state=${state}`;
  
  res.redirect(url);
};
