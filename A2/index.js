const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const AWS = require('aws-sdk');
const axios = require('axios');
const { status } = require('@grpc/grpc-js');

/**
 * to create, upload and delete objects on s3 I have referred - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html, https://rajputankit22.medium.com/read-write-and-delete-file-from-s3-bucket-via-nodejs-2e17047d2178
 * to create grpc server and run the server I have referred - https://grpc.io/docs/languages/node/basics/, https://blog.logrocket.com/communicating-between-node-js-microservices-with-grpc/, https://daily.dev/blog/build-a-grpc-service-in-nodejs
 */

// To load the protobuf file for gRPC
const protoPath = './computeandstorage.proto';
const packageDefinition = protoLoader.loadSync(protoPath);
const { computeandstorage } = grpc.loadPackageDefinition(packageDefinition);

// Configuring AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION,
});

// Create an S3 instance
const s3 = new AWS.S3();

/**
 * Given function stores data in file in the S3 bucket
 * @param {object} call - gRPC call object
 * @param {function} callback - callback function to send the response
 */
function storeData(call, callback) {
  console.log("In StoreData");
  const { data } = call.request;

  // set file name of the file which will be stored on s3 bucket
  const fileName = `file.txt`;

  // Set the S3 bucket name
  const bucketName = 'csci-5409-priyank-patel';

  // Set the file content and key
  const fileContent = data;
  const fileKey = fileName;

  // Set the S3 upload parameters
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileContent,
  };

  // Upload the file to S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error storing data in S3:', err);
      callback(err);
      return;
    }

    // Returns s3 URL of the given file
    const s3uri = data.Location;
    const response = { "s3uri": s3uri };
    console.log(response);
    callback(null, response);
  });
}

/**
 * Function to append data to an existing file in the S3 bucket
 * @param {object} call - gRPC call object
 * @param {function} callback - callback function to send the response
 */
function appendData(call, callback) {
  console.log("In APpend");
  const { data } = call.request;

  // Retrieve the file content from S3
  s3.getObject({ Bucket: 'csci-5409-priyank-patel', Key: 'file.txt' }, (err, result) => {
    if (err) {
      console.error('Error retrieving file from S3:', err);
      callback(err);
      return;
    }

    // Append the new data to the existing content
    const existingData = result.Body.toString();
    const newData = existingData + data;
    console.log("data append in file");
    // Update the file in S3 with the appended data
    s3.upload(
      { Bucket: 'csci-5409-priyank-patel', Key: 'file.txt', Body: newData },
      (err, data) => {
        if (err) {
          console.error('Error appending data to S3 file:', err);
          callback(err);
          return;
        }
        console.log("file uploaded after append");
        // Returns s3 URL of the given file
        const s3uri = data.Location;
        const response = { "s3uri": s3uri };

        callback(null, response);
      }
    );
  });
}

/**
 * Function to delete a file from the S3 bucket
 * @param {object} call - gRPC call object
 * @param {function} callback - callback function to send the response
 */
function deleteFile(call, callback) {

  console.log("In delete method");

  const { s3uri } = call.request;

  // Extract the S3 bucket and key from the S3 URI
  const urlParts = s3uri.split('/');
  const Name = urlParts[2];
  const s3Name = Name.split('.');
  const bucketName = s3Name[0];
  const key = urlParts.slice(3).join('/');

  // Delete the file from S3
  s3.deleteObject({ Bucket: bucketName, Key: key }, (err, data) => {
    if (err) {
      console.error('Error deleting file from S3:', err);
      callback(err);
      return;
    }

    callback(null, data);
  });
}

/**
 * Start the gRPC server
 */
async function startServer() {
  const server = new grpc.Server();
  
  // Add the gRPC service and its methods to the server
  server.addService(computeandstorage.EC2Operations.service, {
    StoreData: storeData,
    AppendData: appendData,
    DeleteFile: deleteFile,
  });

  const port = 50051; // port number where grpc server is bind and will be running

  // Binding the server to the specified IP address and port
  server.bind(`54.152.8.134:${port}`, grpc.ServerCredentials.createInsecure());

  // Start the server
  server.start();
  console.log(`gRPC server started on port ${port}`);

  // Send a POST request after starting the server
  sendPostRequest();
}

/**
 * Function to send a POST request to a specific URL
 */
async function sendPostRequest() {
  try {
    const bannerId = 'B00928736';
    const ipAddress = '54.152.8.134:50051';

    const jsonData = {
      banner: bannerId,
      ip: ipAddress,
    };

    // Send a POST request to Professor's App URL with the JSON data
    const response = await axios.post('http://54.173.209.76:9000/start', jsonData);
    console.log('Introduction successful');
    console.log(response.data);
  } catch (error) {
    console.error('Error during introduction:', error);
  }
}

// Call the startServer function to start the gRPC server
startServer();
