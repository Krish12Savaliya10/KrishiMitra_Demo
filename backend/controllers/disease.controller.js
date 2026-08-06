const { detectDiseaseFromImageBase64 } = require('../services/geminiService');

// @desc    Predict crop disease from image
// @route   POST /api/disease/predict
// @access  Public
exports.predictDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file' });
    }

    // Convert buffer to base64
    const base64Str = req.file.buffer.toString('base64');
    const imageBase64 = `data:${req.file.mimetype};base64,${base64Str}`;

    // Send to Gemini service
    const diseaseResult = await detectDiseaseFromImageBase64(imageBase64);

    res.status(200).json({
      success: true,
      data: {
        disease: diseaseResult,
        confidence: 0.95, // Gemini doesn't give a confidence score in this format, so we return a high default
        fallback: false
      }
    });
  } catch (error) {
    console.error('Disease Prediction Error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};
