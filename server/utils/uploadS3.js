const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Upload } = require('@aws-sdk/lib-storage');

// AWS SDK v3 client
const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer setup — saves file temporarily to local disk
const upload = multer({ dest: 'temp/' });

// Upload handler (to be used in a route)
const uploadToS3 = async (file) => {
  const stream = fs.createReadStream(file.path);

  const uploadParams = {
    client: s3,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `products/${Date.now()}_${file.originalname}`,
      Body: stream,
      ACL: 'public-read',
      ContentType: file.mimetype,
    },
  };

  const parallelUploads3 = new Upload(uploadParams);

  try {
    const result = await parallelUploads3.done();
    fs.unlinkSync(file.path); // cleanup local file
    return result;
  } catch (err) {
    fs.unlinkSync(file.path); // cleanup on error too
    throw err;
  }
};

module.exports = {
  upload,
  uploadToS3,
};
