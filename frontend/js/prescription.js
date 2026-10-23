// LOAD PATIENTS
async function loadPatients() {

    const response =
        await fetch(
            'http://localhost:5000/api/patients'
        );

    const patients =
        await response.json();

    let output = '';

    patients.forEach(patient => {

        output += `
        <option value="${patient.patient_id}">
            ${patient.name}
        </option>
        `;

    });

    document.getElementById(
        'patient'
    ).innerHTML = output;
}


// LOAD DOCTORS
async function loadDoctors() {

    const response =
        await fetch(
            'http://localhost:5000/api/doctors'
        );

    const doctors =
        await response.json();

    let output = '';

    doctors.forEach(doctor => {

        output += `
        <option value="${doctor.doctor_id}">
            ${doctor.name}
        </option>
        `;

    });

    document.getElementById(
        'doctor'
    ).innerHTML = output;
}


// CREATE PRESCRIPTION
async function createPrescription() {

    const patient_id =
        document.getElementById(
            'patient'
        ).value;

    const doctor_id =
        document.getElementById(
            'doctor'
        ).value;

    const medicines =
        document.getElementById(
            'medicines'
        ).value.trim();

    const instructions =
        document.getElementById(
            'instructions'
        ).value.trim();

    if (medicines === "") {

        alert(
            "Please enter medicines"
        );

        return;
    }

    if (instructions === "") {

        alert(
            "Please enter instructions"
        );

        return;
    }

    const response =
        await fetch(
            'http://localhost:5000/api/prescriptions',
            {
                method: 'POST',

                headers: {
                    'Content-Type':
                    'application/json'
                },

                body: JSON.stringify({
                    patient_id,
                    doctor_id,
                    medicines,
                    instructions
                })
            }
        );

    const data =
        await response.json();

    alert(data.message);

    document.getElementById(
        'medicines'
    ).value = "";

    document.getElementById(
        'instructions'
    ).value = "";

    getPrescriptions();
}


// LOAD PRESCRIPTIONS
async function getPrescriptions() {

    const response =
        await fetch(
            'http://localhost:5000/api/prescriptions'
        );

    const prescriptions =
        await response.json();

    let output = '';

    prescriptions.forEach(pr => {

        output += `
        <tr>

            <td>
                PR${String(
                    pr.prescription_id
                ).padStart(3,'0')}
            </td>

            <td>
                ${pr.patient_name}
            </td>

            <td>
                ${pr.doctor_name}
            </td>

            <td>
                ${pr.medicines}
            </td>

            <td>
                ${pr.instructions}
            </td>

            <td>
                ${
                    pr.prescription_date
                    .split('T')[0]
                }
            </td>

            <td>

                <button
                onclick="
                window.open(
                'http://localhost:5000/api/prescriptions/download/${pr.prescription_id}'
                )
                ">
                PDF
                </button>

                <button
                onclick="
                deletePrescription(
                ${pr.prescription_id}
                )
                ">
                Delete
                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById(
        'prescriptionTable'
    ).innerHTML = output;
}


// DELETE PRESCRIPTION
async function deletePrescription(id) {

    const confirmDelete =
        confirm(
            "Delete this prescription?"
        );

    if (!confirmDelete)
        return;

    const response =
        await fetch(
            `http://localhost:5000/api/prescriptions/${id}`,
            {
                method:'DELETE'
            }
        );

    const data =
        await response.json();

    alert(data.message);

    getPrescriptions();
}


// PAGE LOAD
window.onload = function () {

    loadPatients();

    loadDoctors();

    getPrescriptions();

};