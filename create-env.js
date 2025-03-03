const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envFileContent = `
(function(window) {
  window.__env = window.__env || {};
  window.__env.API_KEY = "${process.env.API_KEY}";
  window.__env.API_URL = "${process.env.API_URL}";
})(this);
`;

fs.writeFileSync('./src/assets/env.js', envFileContent);
