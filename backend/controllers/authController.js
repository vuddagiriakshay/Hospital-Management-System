const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// REGISTER
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users(username, email, password, role)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [username, email, hashedPassword, role],
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                res.status(201).json({
                    message: "User Registered Successfully"
                });
            }
        );

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// LOGIN
exports.loginUser = (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid Email"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            role: user.role
        });

    });
};