import React, { useEffect, useState } from "react";
import API from "../axiosConfig";

function MyRides() {

const [rides,setRides] = useState([]);

useEffect(()=>{

fetchRides();

},[]);

const fetchRides = async()=>{

try{

const user = JSON.parse(

localStorage.getItem("user")

);

const response = await API.get(

`/api/rides/my-rides/${user.name}`

);

setRides(response.data);

}catch(error){

console.log(error);

alert("Failed To Load Rides");

}

};

const updateStatus = async(id,status)=>{

try{

await API.put(

`/api/rides/${id}/status?status=${status}`

);

fetchRides();

}catch(error){

console.log(error);

alert("Failed To Update Status");

}

};

const deleteRide = async(id)=>{

try{

await API.delete(

`/api/rides/${id}`

);

alert("Ride Deleted");

fetchRides();

}catch(error){

console.log(error);

alert("Delete Failed");

}

};

return(

<div
style={{
minHeight:"100vh",
background:
"linear-gradient(180deg,#eef4ff 0%, #e7eefc 35%, #f5f7fb 70%, #ffffff 100%)",
padding:"30px"
}}
>

<div className="container">

{/* HERO */}

<div
style={{
background:
"linear-gradient(135deg,#1b0d08,#321408,#5a2405)",
padding:"50px",
borderRadius:"35px",
marginBottom:"50px",
color:"white",
boxShadow:"0 25px 60px rgba(0,0,0,.35)"
}}
>

<div
style={{
display:"inline-block",
padding:"10px 20px",
background:"rgba(249,115,22,.15)",
borderRadius:"30px",
marginBottom:"20px"
}}
>

Ride Management

</div>

<h1
style={{
fontSize:"58px",
fontWeight:"800"
}}
>

My Published Rides

</h1>

<p
style={{
fontSize:"18px",
color:"#d1d5db"
}}
>

Manage ride status, update rides and monitor travel activity.

</p>

</div>

{

rides.length===0 ?

<div
style={{
background:"rgba(255,255,255,.96)",
padding:"80px",
borderRadius:"30px",
textAlign:"center",
boxShadow:"0 12px 35px rgba(0,0,0,.2)"
}}
>

<h2>

No rides available

</h2>

<p>

Create your first ride

</p>

</div>

:

<div className="row g-5">

{

rides.map((ride)=>(

<div
className="col-lg-6"
key={ride.id}
>

<div
style={{
background:"rgba(255,255,255,.96)",
backdropFilter:"blur(10px)",
padding:"30px",
borderRadius:"28px",
boxShadow:"0 12px 35px rgba(0,0,0,.25)",
border:"1px solid rgba(255,255,255,.15)",
height:"100%"
}}
>

<div className="d-flex justify-content-between align-items-center">

<h2
style={{
fontWeight:"700"
}}
>

{ride.source}

{" → "}

{ride.destination}

</h2>

<span
style={{
background:

ride.status==="COMPLETED"

?

"#dcfce7"

:

ride.status==="CANCELLED"

?

"#fee2e2"

:

"#fff7ed",

color:

ride.status==="COMPLETED"

?

"#166534"

:

ride.status==="CANCELLED"

?

"#b91c1c"

:

"#9a3412",

padding:"10px 18px",
borderRadius:"30px",
fontWeight:"600"
}}
>

{ride.status}

</span>

</div>

<hr/>

<div className="row mt-2">

<div className="col-6 mb-4">

<b>Date</b>

<p>

{ride.date}

</p>

</div>

<div className="col-6 mb-4">

<b>Time</b>

<p>

{ride.time}

</p>

</div>

<div className="col-6">

<b>Seats</b>

<p>

{ride.availableSeats}

</p>

</div>

<div className="col-6">

<b>Fare</b>

<p>

₹{ride.fare}

</p>

</div>

</div>

<select
className="form-select mt-4"
value={ride.status}
onChange={(e)=>

updateStatus(
ride.id,
e.target.value
)

}
style={{
borderRadius:"12px",
padding:"12px"
}}
>

<option>

UPCOMING

</option>

<option>

ONGOING

</option>

<option>

COMPLETED

</option>

<option>

CANCELLED

</option>

</select>

<div className="row mt-4">

<div className="col-6">

<a
href={`/update-ride/${ride.id}`}
className="btn w-100"
style={{
background:"#f59e0b",
color:"white",
padding:"12px",
borderRadius:"12px",
fontWeight:"600"
}}
>

Update

</a>

</div>

<div className="col-6">

<button
className="btn btn-danger w-100"
style={{
padding:"12px",
borderRadius:"12px",
fontWeight:"600"
}}
onClick={()=>
deleteRide(
ride.id
)
}
>

Delete

</button>

</div>

</div>

</div>

</div>

))

}

</div>

}

</div>

</div>

);

}

export default MyRides;