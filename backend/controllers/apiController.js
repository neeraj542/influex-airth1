const axios = require('axios');

exports.exchangeToken = async (req, res) => {
  const authCode = req.query.code;
  // console.log("authCode ", authCode);
  if (!authCode || typeof authCode !== 'string') {
    return res.status(400).send('Authorization code is invalid!');
  }

  const TOKEN_URL = 'https://api.instagram.com/oauth/access_token';
  const payload = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: process.env.REDIRECT_URI,
    code: authCode,
  };

  try {
    const encodedRes = new URLSearchParams(payload);
    const response = await axios.post(TOKEN_URL, encodedRes, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send(`Error exchanging token: ${error.response?.data?.error_message || error.message}`);
  }
};

exports.exchangeLongLivedToken = async (req, res) => {
  const shortLivedToken = req.query.access_token;
  if (!shortLivedToken) {
      return res.status(400).json({ error: 'Access token is missing!' });
  }
  const EXCHANGE_URL = 'https://graph.instagram.com/access_token';
  try {
      // Send request to exchange the token
      const response = await axios.get(EXCHANGE_URL, {
          params: {
              grant_type: 'ig_exchange_token',
              client_secret: process.env.CLIENT_SECRET,
              access_token: shortLivedToken,
          },
      });
      // Return the long-lived token
      res.json(response.data); // Contains long-lived access token and expiration
  } catch (error) {
      // console.error('Error exchanging token:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to exchange token.', details: error.response?.data });
  }
};