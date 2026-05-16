const swaggerJsDoc = require("swagger-jsdoc");

const options = {

  definition: {

    openapi: "3.0.0",

    info: {

      title: "Realm Digital Bank API",

      version: "1.0.0",

      description:
        "Backend API for Realm Digital Banking System",

    },

    servers: [

      {
        url: "http://localhost:5000",
      },

    ],

  },

  apis: ["./routes/*.js"],

};

const swaggerSpec =
  swaggerJsDoc(options);

module.exports = swaggerSpec;