const crypto = require('crypto');
const axios = require('axios');

// Handler function to perform the hashing operation
exports.handler = async (event) => {
  console.log("Event:", event);

  try {
    const msg = event.value; 

    // Hash the value using SHA-256
    const sha256Hash = crypto.createHash('sha256').update(msg).digest('hex');

    console.log("Hashed value using SHA-256:", sha256Hash);

    // Create the output object
    const output = {
      "banner": "B00928736",
      "result": sha256Hash,
      "arn": "arn:aws:lambda:us-east-1:739097579447:function:sha256Function",
      "action": "sha256",
      "value": msg
    };

    // Send the output object as a POST request
    const postResponse = await axios.post("https://v7qaxwoyrb.execute-api.us-east-1.amazonaws.com/default/end", output);
    console.log("POST response:", output);
  } catch (error) {
    console.error("Error while hashing or posting result:", error.message);
  }
};
