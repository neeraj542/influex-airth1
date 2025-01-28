const axios = require('axios');

const login = (req, res) => {
  const instagramAuthUrl = `https://www.instagram.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&response_type=code&scope=instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish`;
  res.redirect(instagramAuthUrl);
};

const redirect = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing.' });
  }

  try {
    const tokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: process.env.REDIRECT_URI,
      code,
    });

    const { access_token, user_id } = tokenResponse.data;
    res.status(200).json({ access_token, user_id });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to exchange code for access token.',
      details: error.response?.data || error.message,
    });
  }
};

module.exports = {
  login,
  redirect
};