const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API Documentation",
    description: "This is the documentation for the API",
  },
  // The host value should be accessible via http/https. Ensure it is not set to a file:// URL.
  // This prevents CORS errors like "URL scheme must be 'http' or 'https' for CORS request".
  host: process.env.HOST || "cse341-project1-v81l.onrender.com",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
