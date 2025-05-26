# Car Review Generator

This project is a full-stack Node.js application that uses OpenAI to analyze and summarize car owner reviews. It provides a web interface for users to ask questions about specific car models or generate pros and cons lists based on real owner feedback.

## Features
- Ask specific questions about a car make and model and get AI-generated answers based on owner reviews.
- Generate a list of pros and cons for any car make and model.
- Simple web frontend and REST API backend.

## Prerequisites
- Node.js (v18 or newer recommended)
- npm
- An OpenAI API key ([get one here](https://platform.openai.com/account/api-keys))

## Installation
1. Clone this repository:
   ```bash
   git clone <repo-url>
   cd aiPlayground
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file or set the environment variable `OPENAI_API_KEY` with your OpenAI API key:
   ```bash
   export OPENAI_API_KEY=your_openai_api_key
   ```

## Running the Application
- To start the server:
  ```bash
  npm start
  ```
- For development with auto-reload:
  ```bash
  npm run dev
  ```
- Open your browser and go to [http://localhost:3000](http://localhost:3000)

## API Endpoints
- `POST /api/ask` — Ask a question about a car
  - Body: `{ "carModel": "Audi A1", "question": "How reliable is this car?" }`
- `POST /api/proscons` — Get pros and cons for a car
  - Body: `{ "carModel": "Audi A1" }`

## File Structure
- `server.js` — Express backend
- `public/` — Frontend HTML, JS, and CSS
- `src/` — Backend logic and OpenAI integration
- `data/owner_reviews.json` — Owner review data

## License
MIT
