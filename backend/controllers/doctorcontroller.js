const db = require('../db');

// ADD DOCTOR
exports.addDoctor = (req, res) => {

    const {
        name,
        specialization,
        gender,
        phone,
        experience
    } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Doctor Name Required"
        });
    }

    if (!specialization) {
        return res.status(400).json({
            message: "Select Specialization"
        });
    }

    if (
        gender !== "Male" &&
        gender !== "Female" &&
        gender !== "Other"
    ) {
        return res.status(400).json({
            message: "Select Gender"
        });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({
            message: "Phone must contain exactly 10 digits"
        });
    }

    if (experience < 0 || experience > 50) {
        return res.status(400).json({
            message: "Experience must be between 0 and 50"
        });
    }

    const sql =
        `INSERT INTO doctors
        (name,specialization,gender,phone,experience)
        VALUES(?,?,?,?,?)`;

    db.query(
        sql,
        [
            name,
            specialization,
            gender,
            phone,
            experience
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database Error"
                });

            }

            res.status(201).json({
                message: "Doctor Added Successfully"
            });

        }
    );
};


// GET ALL DOCTORS
exports.getDoctors = (req, res) => {

    const sql = 'SELECT * FROM doctors';

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};


// DELETE DOCTOR
exports.deleteDoctor = (req, res) => {

    const id = req.params.id;

    const sql =
        'DELETE FROM doctors WHERE doctor_id=?';

    db.query(
        sql,
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Doctor Deleted Successfully"
            });

        }
    );
};


// UPDATE DOCTOR
exports.updateDoctor = (req, res) => {

    const id = req.params.id;

    const {
        name,
        specialization,
        gender,
        phone,
        experience
    } = req.body;

    const sql =
        'UPDATE doctors SET name=?,specialization=?,gender=?,phone=?,experience=? WHERE doctor_id=?';

    db.query(
        sql,
        [
            name,
            specialization,
            gender,
            phone,
            experience,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Doctor Updated Successfully"
            });

        }
    );
};