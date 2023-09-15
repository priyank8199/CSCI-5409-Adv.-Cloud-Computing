const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const PORT = 6000;

app.use(express.json());

app.post('/calculate', async (req, res) => {
  const { file, product } = req.body;

  if (!file || !product) {
    return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
  }

  const filePath = `/app/filedata/${file}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ file, error: 'File not found.' });
  }


  try {
    const response = await axios.post('http://priyank-container2:6001/calculate', { file, product });
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ file, error: 'File not found.' });
    }
    if (error.response && error.response.status === 400) {
      return res.status(400).json({ file, error: 'Input file not in CSV format.' });
    }
    return res.status(500).json({ file, error: 'An error occurred.' });
  }
});

app.listen(PORT, () => {
  console.log(`Container 1 listening on port ${PORT}`);
});