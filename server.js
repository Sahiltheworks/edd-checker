const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // If using Node <18

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/edd', async (req, res) => {
  const pickupPincode = '122001';
  const destinationPincode = req.query.pincode;

  if (!destinationPincode) {
    return res.status(400).json({ error: 'Missing pincode' });
  }

  const url = `https://app.shipway.com/api/PredictedEdd?pickup_pincode=${pickupPincode}&destination_pincode=${destinationPincode}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Basic c3VtZXJAc2hvcGxpbGlsby5jb206OUIzdEFoMjAyWUVaaFc0eWVpVDIxWVc3YzhvRkVKVk0K',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch EDD data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
