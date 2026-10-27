module.exports = (req, res) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) return res.status(500).send('Missing OAUTH_GITHUB_CLIENT_ID');
  const redirectUri = 'https://mindfulroom.vercel.app/api/callback';
  const url = 'https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&scope=repo,user';
  res.redirect(url);
};