// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

const SHIPWAY_AUTH = 'Basic c3VtZXJAc2hvcGxpbGlsby5jb206OUIzdEFoMjAyWUVaaFc0eWVpVDIxWVc3YzhvRkVKVk0K'; // your Shipway key
const PICKUP_PINCODE = '122001'; // your warehouse pincode

app.get('/edd', async (req, res) => {
  const destinationPincode = req.query.pincode;
  if (!destinationPincode) {
    return res.status(400).json({ error: 'Missing pincode' });
  }

  try {
    const response = await fetch(`https://app.shipway.com/api/PredictedEdd?pickup_pincode=${PICKUP_PINCODE}&destination_pincode=${destinationPincode}`, {
      method: 'GET',
      headers: {
        Authorization: SHIPWAY_AUTH
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching EDD:', error);
    res.status(500).json({ error: 'Failed to fetch EDD' });
  }
});

app.get('/', (req, res) => {
  res.send('EDD Checker is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

