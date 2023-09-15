const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const PORT = 6000;

app.use(express.json());


app.post('/store-file', async (req, res) => {
  const { file, data } = req.body;

  if (!file || !data) {
    return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
  }

    //path to persistent storage
  const filePath = `../usr/priyank_pv_dir/${file}`;
  
  try {
    fs.writeFileSync(filePath, data); 

    return res.status(200).json({ file, message: 'Success.' });
  } catch (error) {
    return res.status(500).json({ file, error: 'Error while storing the file to the storage.' });
  }
});

app.post('/calculate', async (req, res) => {
  const { file, product } = req.body;

  if (!file || !product) {
    return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
  }

  const filePath = `../usr/priyank_pv_dir/${file}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ file, error: 'File not found.' });
  }


  try {
    const response = await axios.post('http://container-2-service:6001/calculate', { file, product });
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