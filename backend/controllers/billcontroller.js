const db = require('../db');

// CREATE BILL
exports.createBill = (req, res) => {

    const {
        patient_id,
        consultation_fee,
        medicine_fee,
        lab_fee
    } = req.body;

    const total_amount =
        Number(consultation_fee) +
        Number(medicine_fee) +
        Number(lab_fee);

    const bill_date =
        new Date().toISOString().split('T')[0];

    const sql =
    `INSERT INTO bills
    (
        patient_id,
        consultation_fee,
        medicine_fee,
        lab_fee,
        total_amount,
        bill_date
    )
    VALUES(?,?,?,?,?,?)`;

    db.query(
        sql,
        [
            patient_id,
            consultation_fee,
            medicine_fee,
            lab_fee,
            total_amount,
            bill_date
        ],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Bill Generated Successfully"
            });

        }
    );
};


// GET BILLS
exports.getBills = (req,res)=>{

    const sql =
    `
    SELECT

    b.bill_id,

    p.name AS patient_name,

    b.consultation_fee,

    b.medicine_fee,

    b.lab_fee,

    b.total_amount,

    b.bill_date

    FROM bills b

    JOIN patients p

    ON b.patient_id=p.patient_id
    `;

    db.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });

};


// DELETE BILL
exports.deleteBill = (req,res)=>{

    const id = req.params.id;

    const sql =
    'DELETE FROM bills WHERE bill_id=?';

    db.query(sql,[id],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            message:"Bill Deleted Successfully"
        });

    });

};