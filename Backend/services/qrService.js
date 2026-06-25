const axios = require("axios");

const generateCodes = async (assetData) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/generate",
      assetData
    );

    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = { generateCodes };