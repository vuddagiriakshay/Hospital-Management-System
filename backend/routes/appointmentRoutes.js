const express = require('express');

const router = express.Router();

const {
bookAppointment,
getAppointments,
deleteAppointment,
updateStatus
}
=

require(
'../controllers/appointmentController'
);

// Book Appointment
router.post(
'/',
bookAppointment
);

// Get Appointments
router.get(
'/',
getAppointments
);

// Update Appointment Status
router.put(
'/status/:id',
updateStatus
);

// Delete Appointment
router.delete(
'/:id',
deleteAppointment
);

module.exports = router;
