async function loadDashboard() {

    const response =
        await fetch(
            'http://localhost:5000/api/dashboard'
        );

    const data =
        await response.json();

    document.getElementById(
        'patients'
    ).innerText =
        data.patients;

    document.getElementById(
        'doctors'
    ).innerText =
        data.doctors;

    document.getElementById(
        'appointments'
    ).innerText =
        data.appointments;

    document.getElementById(
        'revenue'
    ).innerText =
        '₹' + data.revenue;


    createChart(data);

}


function createChart(data){

    const ctx =
    document.getElementById(
    'hospitalChart'
    );

    new Chart(ctx, {

        type:'bar',

        data:{

            labels:[
                'Patients',
                'Doctors',
                'Appointments'
            ],

            datasets:[{

                label:
                'Hospital Statistics',

                data:[
                    data.patients,
                    data.doctors,
                    data.appointments
                ],

                borderWidth:1

            }]
        },

        options:{

            responsive:true,

            scales:{

                y:{
                    beginAtZero:true
                }

            }

        }

    });

}

window.onload =
loadDashboard;