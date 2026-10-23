async function loadPatients(){


const response =
await fetch(
'http://localhost:5000/api/patients'
);

const patients =
await response.json();

let output='';

patients.forEach(patient=>{

    output += `
    <option value="${patient.patient_id}">
    ${patient.name}
    </option>
    `;

});

document.getElementById(
'patient'
).innerHTML=output;


}

async function loadDoctors(){


const response =
await fetch(
'http://localhost:5000/api/doctors'
);

const doctors =
await response.json();

let output='';

doctors.forEach(doctor=>{

    output += `
    <option value="${doctor.doctor_id}">
    ${doctor.name}
    </option>
    `;

});

document.getElementById(
'doctor'
).innerHTML=output;


}

async function bookAppointment(){


const patient_id =
document.getElementById(
'patient'
).value;

const doctor_id =
document.getElementById(
'doctor'
).value;

const appointment_date =
document.getElementById(
'date'
).value;

const appointment_time =
document.getElementById(
'time'
).value;

const response =
await fetch(
'http://localhost:5000/api/appointments',
{
    method:'POST',

    headers:{
        'Content-Type':
        'application/json'
    },

    body:JSON.stringify({
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time
    })
}
);

const data =
await response.json();

alert(data.message);

getAppointments();


}

async function getAppointments(){


const response =
await fetch(
'http://localhost:5000/api/appointments'
);

const appointments =
await response.json();

let output='';

appointments.forEach(app=>{

    output += `
    <tr>

    <td>
    APT${String(
    app.appointment_id
    ).padStart(3,'0')}
    </td>

    <td>
    ${app.patient_name}
    </td>

    <td>
    ${app.doctor_name}
    </td>

    <td>
    ${app.appointment_date
    .split('T')[0]}
    </td>

    <td>
    ${app.appointment_time}
    </td>

    <td>

    <select
    onchange="
    updateStatus(
    ${app.appointment_id},
    this.value
    )
    ">

    <option
    value="Scheduled"
    ${app.status==='Scheduled'
    ?'selected':''}>
    Scheduled
    </option>

    <option
    value="Completed"
    ${app.status==='Completed'
    ?'selected':''}>
    Completed
    </option>

    <option
    value="Cancelled"
    ${app.status==='Cancelled'
    ?'selected':''}>
    Cancelled
    </option>

    </select>

    </td>

    <td>

    <button
    onclick="
    deleteAppointment(
    ${app.appointment_id}
    )
    ">
    Delete
    </button>

    </td>

    </tr>
    `;

});

document.getElementById(
'appointmentTable'
).innerHTML=output;


}

async function updateStatus(
id,
status
){


const response =
await fetch(
`http://localhost:5000/api/appointments/status/${id}`,
{
    method:'PUT',

    headers:{
        'Content-Type':
        'application/json'
    },

    body:JSON.stringify({
        status
    })
}
);

const data =
await response.json();

alert(data.message);


}

async function deleteAppointment(id){


const response =
await fetch(
`http://localhost:5000/api/appointments/${id}`,
{
    method:'DELETE'
}
);

const data =
await response.json();

alert(data.message);

getAppointments();


}

window.onload=function(){


loadPatients();

loadDoctors();

getAppointments();


}
