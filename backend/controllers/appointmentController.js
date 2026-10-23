const db = require('../db');

exports.bookAppointment = (req, res) => {

    const {
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time
    } = req.body;

    const checkSql = `
    SELECT *
    FROM appointments
    WHERE doctor_id=?
    AND appointment_date=?
    AND appointment_time=?`;

    db.query(
        checkSql,
        [
            doctor_id,
            appointment_date,
            appointment_time
        ],
        (err, result) => {

            if (result.length > 0) {

                return res.status(400).json({
                    message:
                    "Doctor unavailable at selected time"
                });

            }

            const sql = `
            INSERT INTO appointments
            (
                patient_id,
                doctor_id,
                appointment_date,
                appointment_time
            )
            VALUES(?,?,?,?)
            `;

            db.query(
                sql,
                [
                    patient_id,
                    doctor_id,
                    appointment_date,
                    appointment_time
                ],
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.json({
                        message:
                        "Appointment Booked Successfully"
                    });

                }
            );

        }
    );

};



exports.getAppointments = (req, res) => {

    const sql = `
    SELECT

    a.appointment_id,

    p.name AS patient_name,

    d.name AS doctor_name,

    a.appointment_date,

    a.appointment_time,

    a.status

    FROM appointments a

    JOIN patients p
    ON a.patient_id=p.patient_id

    JOIN doctors d
    ON a.doctor_id=d.doctor_id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};



exports.deleteAppointment = (req, res) => {

    const id = req.params.id;

    const sql =
    'DELETE FROM appointments WHERE appointment_id=?';

    db.query(sql,[id],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            message:
            "Appointment Deleted Successfully"
        });

    });

};

exports.updateStatus = (req, res) => {

    const id = req.params.id;

    const status = req.body.status;

    const sql = `
    UPDATE appointments
    SET status=?
    WHERE appointment_id=?
    `;

    db.query(
        sql,
        [status, id],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:
                "Appointment Status Updated Successfully"
            });

        }
    );

};