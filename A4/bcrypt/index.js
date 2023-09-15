const bcrypt = require('bcryptjs');
const axios = require('axios');

exports.handler = async (event) => {
  console.log("Event:", event);

  try {
    const msg = event.value; 

    const salt = await bcrypt.genSalt(12);

    const hashedValue = await bcrypt.hash(msg, salt);

    console.log("Hashed value:", hashedValue);

    const output = {
      "banner": "B00928736",
      "result": hashedValue,
      "arn": "arn:aws:lambda:us-east-1:739097579447:function:bcryptFunction",
      "action": "bcrypt",
      "value": msg
    };

    const res = await axios.post("https://v7qaxwoyrb.execute-api.us-east-1.amazonaws.com/default/end", output);
    console.log("POST response:", res);
  } catch (error) {
    console.error("Error while hashing or posting result:", error.message);
  }
};
