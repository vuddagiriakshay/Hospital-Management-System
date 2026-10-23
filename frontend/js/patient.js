// ADD PATIENT
async function addPatient() {

    const name =
        document.getElementById('name').value.trim();

    const age =
        parseInt(document.getElementById('age').value);

    const gender =
        document.getElementById('gender').value;

    const phone =
        document.getElementById('phone').value.trim();

    const address =
        document.getElementById('address').value.trim();

    if (name === "") {
        alert("Name is required");
        return;
    }

    if (isNaN(age) || age < 1 || age > 100) {
        alert("Invalid Age! Age must be between 1 and 100");
        return;
    }

    if (gender === "") {
        alert("Please select gender");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Phone number must contain exactly 10 digits");
        return;
    }

    if (address === "") {
        alert("Address is required");
        return;
    }

    const response = await fetch(
        'http://localhost:5000/api/patients',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                age,
                gender,
                phone,
                address
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
    document.getElementById('gender').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('address').value = "";

    getPatients();
}


// LOAD PATIENTS
async function getPatients() {

    const response =
        await fetch(
            'http://localhost:5000/api/patients'
        );

    const patients =
        await response.json();

    let output = '';

    patients.forEach(patient => {

        output += `
        <tr>
            <td>${patient.patient_id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.phone}</td>
            <td>${patient.address}</td>

            <td>

                <button
                onclick="editPatient(
                    ${patient.patient_id},
                    '${patient.name}',
                    '${patient.age}',
                    '${patient.gender}',
                    '${patient.phone}',
                    '${patient.address}'
                )">

                Edit

                </button>

                <button
                onclick="deletePatient(
                    ${patient.patient_id}
                )">

                Delete

                </button>

            </td>

        </tr>
        `;
    });

    document.getElementById(
        'patientTable'
    ).innerHTML = output;
}


// DELETE PATIENT
async function deletePatient(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this patient?"
        );

    if (!confirmDelete)
        return;

    const response =
        await fetch(
            `http://localhost:5000/api/patients/${id}`,
            {
                method: 'DELETE'
            }
        );

    const data =
        await response.json();

    alert(data.message);

    getPatients();
}


// EDIT PATIENT
async function editPatient(
    id,
    name,
    age,
    gender,
    phone,
    address
) {

    const newName =
        prompt(
            "Enter Name",
            name
        );

    const newAge =
        prompt(
            "Enter Age",
            age
        );

    const newGender =
        prompt(
            "Enter Gender (Male/Female/Other)",
            gender
        );

    const newPhone =
        prompt(
            "Enter Phone",
            phone
        );

    const newAddress =
        prompt(
            "Enter Address",
            address
        );

    if (newAge < 1 || newAge > 100) {
        alert(
            "Age must be between 1 and 100"
        );
        return;
    }

    if (!/^[0-9]{10}$/.test(newPhone)) {
        alert(
            "Phone number must contain exactly 10 digits"
        );
        return;
    }

    const response =
        await fetch(
            `http://localhost:5000/api/patients/${id}`,
            {
                method: 'PUT',

                headers: {
                    'Content-Type':
                    'application/json'
                },

                body: JSON.stringify({
                    name: newName,
                    age: newAge,
                    gender: newGender,
                    phone: newPhone,
                    address: newAddress
                })
            }
        );

    const data =
        await response.json();

    alert(data.message);

    getPatients();
}

function searchPatient() {

    const searchText =
        document.getElementById(
            'searchPatient'
        ).value.toLowerCase();

    const rows =
        document.querySelectorAll(
            '#patientTable tr'
        );

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        if (
            text.includes(searchText)
        ) {

            row.style.display = '';

        }
        else {

            row.style.display = 'none';

        }

    });

}


// AUTO LOAD PATIENTS
window.onload = function () {
    getPatients();
};