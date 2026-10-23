const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes =
    require('./routes/authRoutes');

const patientRoutes =
    require('./routes/patientRoutes');

const doctorRoutes =
require('./routes/doctorRoutes');

const appointmentRoutes =
require('./routes/appointmentRoutes');

const billRoutes =
require('./routes/billRoutes');

const prescriptionRoutes =
require('./routes/prescriptionRoutes');

const dashboardRoutes =
require('./routes/dashboardRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hospital Management System Backend Running");
});

app.use('/api/auth', authRoutes);

app.use('/api/patients', patientRoutes);

app.use('/api/doctors', doctorRoutes);

app.use(
'/api/appointments',
appointmentRoutes
);

app.use(
'/api/bills',
billRoutes
);

app.use(
'/api/prescriptions',
prescriptionRoutes
);

app.use(
'/api/dashboard',
dashboardRoutes
);


const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});