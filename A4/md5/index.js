const md5 = require('md5');
const axios = require('axios');

exports.handler = async (event) => {
  console.log("Event:", event);

  try {
    const msg = event.value; 

    const md5Hash = md5(msg);

    console.log("Hashed value: ", md5Hash);

    // Create the output object
    const output = {
      "banner": "B00928736",
      "result": md5Hash,
      "arn": "arn:aws:lambda:us-east-1:739097579447:function:md5Function",
      "action": "md5",
      "value": msg
    };

    const res = await axios.post("https://v7qaxwoyrb.execute-api.us-east-1.amazonaws.com/default/end", output);
    console.log("POST response:", res);
  } catch (error) {
    console.error("Error while hashing or posting result:", error.message);
  }
};
