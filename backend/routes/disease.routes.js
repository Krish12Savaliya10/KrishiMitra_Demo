const express = require('express');
const router = express.Router();
const multer = require('multer');
const { predictDisease } = require('../controllers/disease.controller.js');
const { protect } = require('../middleware/auth.middleware.js');

// Use memory storage for multer so we can forward the buffer directly
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/predict', protect, upload.single('image'), predictDisease);

module.exports = router;
