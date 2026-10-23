const express = require('express');

const router = express.Router();

const {
    createPrescription,
    getPrescriptions,
    deletePrescription,
    downloadPrescription
} = require('../controllers/prescriptionController');


// Create Prescription
router.post(
    '/',
    createPrescription
);


// Get All Prescriptions
router.get(
    '/',
    getPrescriptions
);


// Download Prescription PDF
router.get(
    '/download/:id',
    downloadPrescription
);


// Delete Prescription
router.delete(
    '/:id',
    deletePrescription
);


module.exports = router;