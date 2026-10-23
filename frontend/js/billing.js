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



async function createBill(){

const patient_id =
document.getElementById(
'patient'
).value;

const consultation_fee =
document.getElementById(
'consultation'
).value || 0;

const medicine_fee =
document.getElementById(
'medicine'
).value || 0;

const lab_fee =
document.getElementById(
'lab'
).value || 0;

const response =
await fetch(
'http://localhost:5000/api/bills',
{
method:'POST',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify({
patient_id,
consultation_fee,
medicine_fee,
lab_fee
})
}
);

const data =
await response.json();

alert(data.message);

getBills();

}



async function getBills(){

const response =
await fetch(
'http://localhost:5000/api/bills'
);

const bills =
await response.json();

let output='';

bills.forEach(bill=>{

output += `
<tr>

<td>
BILL${String(
bill.bill_id
).padStart(3,'0')}
</td>

<td>
${bill.patient_name}
</td>

<td>
₹${bill.consultation_fee}
</td>

<td>
₹${bill.medicine_fee}
</td>

<td>
₹${bill.lab_fee}
</td>

<td>
₹${bill.total_amount}
</td>

<td>
${bill.bill_date
.split('T')[0]}
</td>

<td>

<button
onclick=
"deleteBill(
${bill.bill_id}
)">

Delete

</button>

</td>

</tr>
`;

});

document.getElementById(
'billTable'
).innerHTML=output;

}



async function deleteBill(id){

const response =
await fetch(
`http://localhost:5000/api/bills/${id}`,
{
method:'DELETE'
}
);

const data =
await response.json();

alert(data.message);

getBills();

}



window.onload=function(){

loadPatients();

getBills();

}