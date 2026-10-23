const db = require('../db');

// Add Patient
exports.addPatient = (req, res) => {

    const { name, age, gender, phone, address } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    if (age < 1 || age > 100) {
        return res.status(400).json({
            message: "Age must be between 1 and 100"
        });
    }

    if (
        gender !== "Male" &&
        gender !== "Female" &&
        gender !== "Other"
    ) {
        return res.status(400).json({
            message: "Invalid Gender"
        });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({
            message: "Phone number must contain exactly 10 digits"
        });
    }

    const sql =
        'INSERT INTO patients(name,age,gender,phone,address) VALUES(?,?,?,?,?)';

    db.query(
        sql,
        [name, age, gender, phone, address],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Patient Added Successfully"
            });

        }
    );
};

// Get All Patients
exports.getPatients = (req, res) => {

    const sql = 'SELECT * FROM patients';

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });
};

// Delete Patient
exports.deletePatient = (req, res) => {

    const id = req.params.id;

    const sql =
        'DELETE FROM patients WHERE patient_id=?';

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Patient Deleted Successfully"
        });

    });
};

// Update Patient
exports.updatePatient = (req, res) => {

    const id = req.params.id;

    const { name, age, gender, phone, address } =
        req.body;

    const sql =
        'UPDATE patients SET name=?,age=?,gender=?,phone=?,address=? WHERE patient_id=?';

    db.query(
        sql,
        [name, age, gender, phone, address, id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Patient Updated Successfully"
            });

        }
    );
};