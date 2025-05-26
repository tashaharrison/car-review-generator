const fs = require('fs');
const path = require('path');
const openai = require('./client');

/**
 * Function to get a summary of car reviews for a given make and model
 * @param {string} carModel - The make and model of the car (e.g., 'Audi A1')
 * @returns {Promise<string>} The summary of reviews
 */
async function getProsCons(carModel) {
  try {
    // Read and parse owner_reviews.json
    const reviewsPath = path.join(__dirname, '../data/owner_reviews.json');
    const reviewsData = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
    const carReviews = reviewsData.filter(r => `${r.make} ${r.model}`.toLowerCase() === carModel.toLowerCase());

    if (carReviews.length === 0) {
      return `No reviews found for ${carModel}.`;
    }

    // Prepare review texts for prompt
    const reviewTexts = carReviews.map(r => `Rating: ${r.rating}\nReview: ${r.reviewComment}`).join('\n---\n');
    const prompt = `List 3 pros and 3 cons from the following owner reviews for the ${carModel}. Return the response as JSON with two arrays: {\"pros\":[],\"cons\":[]}. Do not include any other text.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant. Only return valid JSON in the format: {"pros":[],"cons":[]}. Do not include any explanation or extra text.' },
        { role: 'user', content: `${prompt}\n\n${reviewTexts}` }
      ],
    });
    // Parse the JSON response
    let prosCons;
    try {
      prosCons = JSON.parse(response.choices[0].message.content);
    } catch (e) {
      // Fallback: try to extract JSON substring
      const match = response.choices[0].message.content.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          prosCons = JSON.parse(match[0]);
        } catch (err) {
          return 'Sorry, could not parse pros and cons.';
        }
      } else {
        return 'Sorry, could not parse pros and cons.';
      }
    }
    // Return as an object
    return prosCons;
  } catch (error) {
    console.error('Error getting car review summary:', error);
    return 'Failed to get car review summary';
  }
}

exports.getProsCons = getProsCons;
