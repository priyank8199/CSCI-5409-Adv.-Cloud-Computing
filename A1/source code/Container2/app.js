const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 6001;

app.use(express.json());

app.post('/calculate', (req, res) => {
  const { file, product } = req.body;

  if (!file || !product) {
    return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
  }

  const filePath = `/app/filedata/${file}`;
  const results = { file, sum: 0 };

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ file, error: 'File not found.' });
  }


  const csvHeaderRegx = /^product,amount$/;
  const csvRowRegx = /^([^,]+),(\d+)$/;
  
  const readStream = fs.createReadStream(filePath, 'utf-8');
  
  let isCSV = false;
  let isFirstLine = true;
  
  readStream
    .on('data', (dat) => {
      const lines = dat.split('\n');
  
      lines.forEach((line) => {
        if (isFirstLine) {
          if (csvHeaderRegx.test(line.trim())) {
            // File has headers, indicating it is in CSV format
            isCSV = true;
            console.log('File is in CSV format.');
          } else {
            // File does not have the expected header, not in CSV format
            console.log('Input file not in CSV format');
            isCSV = false;
          }
          isFirstLine = false;
        } else if (isCSV && line.trim() !== '') {
          if (csvRowRegx.test(line.trim())) {
            const [rowProduct, amount] = line.trim().split(',');
            if (rowProduct === product) {
              results.sum += parseInt(amount, 10);
            }
          } else {
            // Invalid data row, not in CSV format
            console.log('Input file not in CSV format');
            isCSV = false;
          }
        }
      });
    })
    .on('end', () => {
      if (isCSV) {
        // CSV processing is complete
        res.status(200).json(results);
      } else {
        // File did not have the expected header or encountered invalid data row, not in CSV format
        console.log('Input file not in CSV format.');
        res.status(400).json({ file, error: 'Input file not in CSV format.' });
      }
    })
    .on('error', (err) => {
      console.error('Error reading file:', err);
      res.status(500).json({ file, error: 'An error occurred while reading the file.' });
    });
  });

app.listen(PORT, () => {
  console.log(`Container 2 listening on port ${PORT}`);
});
