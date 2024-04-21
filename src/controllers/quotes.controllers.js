const db = require('../config/database')

// ==> Method responsible for creating a new 'Quote':

exports.createQuotes = async (req, res) => {
  const { quote_text, movie_name, language } = req.body

  const { rows } = await db.query(
    'INSERT INTO quote (quote_text, movie_name, language) VALUES ($1, $2, $3) RETURNING *',
    [quote_text, movie_name, language]
  )

  const newQuote = rows[0]

  res.status(201).send({
    message: 'Quote added successfully!',
    body: {
      quote: newQuote
    }
  })
}

exports.searchQuoteByText = async (req, res) => {
  try {
    const { searchQuote, language } = req.body; // Assuming the search text and language are sent in the request body
    // Check if the search text and language are provided
    if (searchQuote && language) {
      const query = {
        text: 'SELECT movie_name FROM quote WHERE quote_text ILIKE $1 AND language = $2',
        values: [`%${searchQuote}%`, language]
      };
      const { rows } = await db.query(query);
      if (rows.length > 0) {
        res.status(200).send(rows);
      } else {
        res.status(404).send('No matching quotes found for the specified language and text');
      }
    } else {
      // If search text or language is not provided, send error response
      res.status(400).send('Bad Request: Please provide valid search text and language');
    }
  } catch (error) {
    console.error('Error searching quotes:', error);
    res.status(500).send('Internal Server Error');
  }
};
