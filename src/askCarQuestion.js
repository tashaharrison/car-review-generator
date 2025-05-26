const fs = require('fs');
const path = require('path');
const openai = require('./client');

/**
 * Function to answer a specific question about a car make and model using owner reviews
 * @param {string} carModel - The make and model of the car (e.g., 'Audi A1')
 * @param {string} question - The user's question about the car
 * @returns {Promise<string>} The answer to the question
 */
async function askCarQuestion(carModel, question) {
  try {
    const reviewsPath = path.join(__dirname, '../data/owner_reviews.json');
    const reviewsData = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
    const carReviews = reviewsData.filter(r => `${r.make} ${r.model}`.toLowerCase() === carModel.toLowerCase());

    if (carReviews.length === 0) {
      return `No reviews found for ${carModel}.`;
    }

    const reviewTexts = carReviews.map(r => `Rating: ${r.rating}\nReview: ${r.reviewComment}`).join('\n---\n');
    const prompt = `Based on the following owner reviews for the ${carModel}, answer the following question as helpfully as possible.\n\nReviews:\n${reviewTexts}\n\nQuestion: ${question}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that answers questions about car reviews.' },
        { role: 'user', content: prompt }
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error answering car question:', error);
    return 'Failed to answer car question';
  }
}

module.exports = askCarQuestion;
