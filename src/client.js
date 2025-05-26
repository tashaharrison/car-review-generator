const OpenAI = require('openai');

// Initialize the OpenAI client
// Note: You need to set OPENAI_API_KEY environment variable or pass it directly
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = openai;
