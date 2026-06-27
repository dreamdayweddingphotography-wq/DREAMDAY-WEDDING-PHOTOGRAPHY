const express = require('express');
const router = express.Router();
const { 
    createQuotation, 
    getQuotations,
    getQuotationById,
    updateQuotation,
    deleteQuotation
} = require('../controllers/quotationController');

router.route('/')
    .post(createQuotation)
    .get(getQuotations);

router.route('/:id')
    .get(getQuotationById)
    .put(updateQuotation)
    .delete(deleteQuotation);

module.exports = router;
