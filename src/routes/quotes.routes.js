const router = require('express-promise-router')();
const QuotesController = require('../controllers/quotes.controllers');

// ==> Defining CRUD routes for 'Product':

// ==> Route responsible for creating a new 'Product': (POST): localhost:3000/api/products
router.post('/quotes', QuotesController.createQuotes);
router.get('/listquotes', QuotesController.searchQuoteByText);

module.exports = router;
