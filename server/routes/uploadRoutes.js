const express = require('express');
const router = express.Router();
const { upload, uploadToS3 } = require('../utils/uploadS3');

router.post('/', upload.single('productImage'), async (req, res) => {
  try {
    const result = await uploadToS3(req.file);
    res.json({ url: result.Location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;