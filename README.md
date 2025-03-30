# Project Setup and API Documentation

## Running the Server

1. Ensure you have Node.js installed on your system.
2. Install the required dependencies by running:
   ```bash
   npm install
   ```
3. Start the server using the following command:
   ```bash
   npm start
   ```

## Accessing the API Documentation

- Once the server is up and running, access the API documentation by navigating to:
  [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- If the project is deployed, replace `http://localhost:3000` with the appropriate deployed URL.

## Important Notice on CORS

- Always make API calls using HTTP or HTTPS protocols.
- Do not open the files directly in your browser using the file:// protocol as this can cause CORS errors due to inappropriate URL schemes.
