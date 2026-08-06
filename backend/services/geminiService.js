const axios = require('axios');

/**
 * Sends a plant image to Gemini 2.5 Flash Vision API.
 * Returns ONLY the disease name (e.g. "Early Blight on Tomato").
 * The detailed disease info is then handled by the local LLM.
 */
async function detectDiseaseFromImageBase64(base64Image) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables");
  }

  // Strip data URI prefix if present (e.g., "data:image/jpeg;base64,")
  const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  // Detect MIME type from original string
  const mimeMatch = base64Image.match(/^data:(image\/[a-zA-Z]+);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

  // Using gemini-2.5-flash — confirmed working with the provided API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: "You are an expert plant pathologist. Look at this plant image and identify if there is a disease. Reply with ONLY a short disease label in this exact format: '<Disease Name> on <Crop Name>'. Examples: 'Early Blight on Tomato', 'Powdery Mildew on Wheat', 'Leaf Curl on Cotton'. If the image is not a plant or has no visible disease, reply with exactly: 'No disease detected'."
          },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 20000
    });

    const textResponse = response.data.candidates[0]?.content?.parts[0]?.text || "No disease detected";
    const result = textResponse.trim();
    console.log(`[Gemini Vision] Disease classified as: "${result}"`);
    return result;
  } catch (error) {
    const errMsg = error.response?.data?.error?.message || error.message;
    console.error("[Gemini API Error]", errMsg);
    throw new Error(`Gemini Vision API error: ${errMsg}`);
  }
}

module.exports = {
  detectDiseaseFromImageBase64
};
