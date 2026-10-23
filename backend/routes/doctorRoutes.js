const express = require('express');

const router = express.Router();

const {
    addDoctor,
    getDoctors,
    deleteDoctor,
    updateDoctor
} = require('../controllers/doctorController');

router.post('/', addDoctor);

router.get('/', getDoctors);

router.delete('/:id', deleteDoctor);

router.put('/:id', updateDoctor);

module.exports = router;