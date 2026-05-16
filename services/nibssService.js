const axios = require("axios");


// base url
const BASE_URL = "https://nibssbyphoenix.onrender.com";


// token
const TOKEN = process.env.NIBSS_TOKEN;


// validate BVN
const validateBVN = async (bvn) => {

  try {

    const url = `${BASE_URL}/api/validateBvn`;

    console.log("BVN URL:", url);

    const response = await axios.post(

      url,

      {
        bvn: bvn
      },

      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }

    );

    return response.data;

  } catch (error) {

    console.log(
      "BVN ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// validate NIN
const validateNIN = async (nin) => {

  try {

    const url = `${BASE_URL}/api/validateNin`;

    console.log("NIN URL:", url);

    const response = await axios.post(

      url,

      {
        nin: nin
      },

      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }

    );

    return response.data;

  } catch (error) {

    console.log(
      "NIN ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};



module.exports = {
  validateBVN,
  validateNIN,
};