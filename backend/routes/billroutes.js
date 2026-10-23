const express = require('express');

const router = express.Router();

const {
    createBill,
    getBills,
    deleteBill
}
=
require('../controllers/billController');

router.post('/',
createBill);

router.get('/',
getBills);

router.delete('/:id',
deleteBill);

module.exports = router;