const express = require('express');

const router = express.Router();

const {
    addPatient,
    getPatients,
    deletePatient,
    updatePatient
} = require('../controllers/patientController');

router.post('/', addPatient);

router.get('/', getPatients);

router.delete('/:id', deletePatient);

router.put('/:id', updatePatient);

module.exports = router;