async function addDoctor() {

    const name =
        document.getElementById('name').value.trim();

    const specialization =
        document.getElementById('specialization').value;

    const gender =
        document.getElementById('gender').value;

    const phone =
        document.getElementById('phone').value.trim();

    const experience =
        document.getElementById('experience').value;

    try {

        const response =
            await fetch(
                'http://localhost:5000/api/doctors',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        name,
                        specialization,
                        gender,
                        phone,
                        experience
                    })
                }
            );

        const data =
            await response.json();

        if (response.ok) {

            alert(data.message);

            document.getElementById('name').value = "";
            document.getElementById('specialization').value = "";
            document.getElementById('gender').value = "";
            document.getElementById('phone').value = "";
            document.getElementById('experience').value = "";

            getDoctors();

        } else {

            alert(data.message || "Error");

        }

    } catch (error) {

        console.log(error);

        alert("Server Connection Error");

    }
}


async function getDoctors() {

    const response =
    await fetch(
    'http://localhost:5000/api/doctors'
    );

    const doctors =
    await response.json();

    let output='';

    doctors.forEach(doctor=>{

        output += `
        <tr>

        <td>
        DOC${String(
        doctor.doctor_id
        ).padStart(3,'0')}
        </td>

        <td>${doctor.name}</td>

        <td>
        ${doctor.specialization}
        </td>

        <td>${doctor.gender}</td>

        <td>${doctor.phone}</td>

        <td>
        ${doctor.experience} Years
        </td>

        <td>

        <button
        onclick="deleteDoctor(
        ${doctor.doctor_id}
        )">

        Delete

        </button>

        </td>

        </tr>
        `;
    });

    document.getElementById(
    'doctorTable'
    ).innerHTML = output;
}


async function deleteDoctor(id){

    const response =
    await fetch(
    `http://localhost:5000/api/doctors/${id}`,
    {
        method:'DELETE'
    });

    const data =
    await response.json();

    alert(data.message);

    getDoctors();
}


window.onload = function(){

    getDoctors();

}