const db = require('../db');
const PDFDocument = require('pdfkit');

// CREATE PRESCRIPTION
exports.createPrescription = (req, res) => {

    const {
        patient_id,
        doctor_id,
        medicines,
        instructions
    } = req.body;

    const prescription_date =
        new Date().toISOString().split('T')[0];

    const sql =
    `INSERT INTO prescriptions
    (
        patient_id,
        doctor_id,
        medicines,
        instructions,
        prescription_date
    )
    VALUES(?,?,?,?,?)`;

    db.query(
        sql,
        [
            patient_id,
            doctor_id,
            medicines,
            instructions,
            prescription_date
        ],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:
                "Prescription Generated Successfully"
            });

        }
    );
};


// GET PRESCRIPTIONS
exports.getPrescriptions = (req,res)=>{

    const sql =
    `
    SELECT

    pr.prescription_id,

    p.name AS patient_name,

    d.name AS doctor_name,

    pr.medicines,

    pr.instructions,

    pr.prescription_date

    FROM prescriptions pr

    JOIN patients p
    ON pr.patient_id=p.patient_id

    JOIN doctors d
    ON pr.doctor_id=d.doctor_id
    `;

    db.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });

};


// DELETE PRESCRIPTION
exports.deletePrescription =
(req,res)=>{

    const id =
    req.params.id;

    const sql =
    'DELETE FROM prescriptions WHERE prescription_id=?';

    db.query(sql,[id],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            message:
            "Prescription Deleted Successfully"
        });

    });

};

exports.downloadPrescription = (req, res) => {

    const id = req.params.id;

    const sql = `
    SELECT

    p.name AS patient_name,
    d.name AS doctor_name,
    pr.medicines,
    pr.instructions,
    pr.prescription_date

    FROM prescriptions pr

    JOIN patients p
    ON pr.patient_id = p.patient_id

    JOIN doctors d
    ON pr.doctor_id = d.doctor_id

    WHERE pr.prescription_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        const data = result[0];

        const doc = new PDFDocument();

        res.setHeader(
            'Content-Type',
            'application/pdf'
        );

        res.setHeader(
            'Content-Disposition',
            `attachment; filename=Prescription_${id}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(22)
           .text('Hospital Management System', {
               align: 'center'
           });

        doc.moveDown();

        doc.fontSize(14)
           .text(`Patient: ${data.patient_name}`);

        doc.text(`Doctor: ${data.doctor_name}`);

        doc.text(
            `Date: ${
                new Date(data.prescription_date)
                .toLocaleDateString()
            }`
        );

        doc.moveDown();

        doc.fontSize(16)
           .text('Medicines');

        doc.fontSize(12)
           .text(data.medicines);

        doc.moveDown();

        doc.fontSize(16)
           .text('Instructions');

        doc.fontSize(12)
           .text(data.instructions);

        doc.moveDown();

        doc.text(
            'Get Well Soon!',
            {
                align:'center'
            }
        );

        doc.end();

    });

};