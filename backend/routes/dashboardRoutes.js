const express = require('express');

const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {

    const dashboard = {};

    db.query(
        'SELECT COUNT(*) AS totalPatients FROM patients',
        (err, patients) => {

            dashboard.patients =
                patients[0].totalPatients;

            db.query(
                'SELECT COUNT(*) AS totalDoctors FROM doctors',
                (err, doctors) => {

                    dashboard.doctors =
                        doctors[0].totalDoctors;

                    db.query(
                        'SELECT COUNT(*) AS totalAppointments FROM appointments',
                        (err, appointments) => {

                            dashboard.appointments =
                                appointments[0].totalAppointments;

                            db.query(
                                'SELECT SUM(total_amount) AS revenue FROM bills',
                                (err, revenue) => {

                                    dashboard.revenue =
                                        revenue[0].revenue || 0;

                                    res.json(
                                        dashboard
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

});

module.exports = router;