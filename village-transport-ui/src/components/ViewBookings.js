import React, { useEffect, useState } from "react";
import API from "../axiosConfig";

function ViewBookings() {

const [bookings,setBookings] = useState([]);

useEffect(() => {

fetchBookings();

},[]);

const fetchBookings = async() => {

try{

const user = JSON.parse(
localStorage.getItem("user")
);

const response = await API.get(
`/api/bookings/driver/${user.name}`
);

setBookings(response.data);

}catch(error){

console.log(error);

alert("Failed To Load Bookings");

}

};

const approveBooking = async(id) => {

try{

await API.put(
`/api/bookings/approve/${id}`
);

fetchBookings();

}catch{

alert("Failed");

}

};

const rejectBooking = async(id) => {

try{

await API.put(
`/api/bookings/reject/${id}`
);

fetchBookings();

}catch{

alert("Failed");

}

};

const completeRide = async(id)=>{

try{

await API.put(

`/api/bookings/complete/${id}`

);

alert(

"Ride Completed"

);

fetchBookings();

}catch{

alert(

"Failed"

);

}

};
return(

<div
style={{
minHeight:"100vh",
background:
"linear-gradient(180deg,#fff7ed 0%, #fef3e7 35%, #faf5f0 70%, #ffffff 100%)",
padding:"30px"
}}
>

<div className="container">

{/* HERO SECTION */}

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

Booking Management

</div>

<h1
style={{
fontSize:"60px",
fontWeight:"800"
}}
>

Ride Bookings

</h1>

<p
style={{
fontSize:"18px",
color:"#d1d5db"
}}
>

Approve passenger requests and manage ride bookings.

</p>

</div>

{

bookings.length===0 ?

<div
style={{
background:"rgba(255,255,255,.95)",
padding:"60px",
borderRadius:"30px",
textAlign:"center"
}}
>

<h3>

No Bookings Available

</h3>

<p>

Passenger requests will appear here

</p>

</div>

:

<div className="row g-5">

{

bookings.map((booking)=>(

<div
className="col-lg-6"
key={booking.id}
>

<div
style={{
background:"rgba(255,255,255,.96)",
backdropFilter:"blur(12px)",
padding:"30px",
borderRadius:"28px",
boxShadow:"0 12px 35px rgba(0,0,0,.25)",
border:"1px solid rgba(255,255,255,.15)"
}}
>

<div className="d-flex justify-content-between align-items-center">

<h2
style={{
fontWeight:"700"
}}
>

{booking.ride?.source}

{" → "}

{booking.ride?.destination}

</h2>

<span
style={{
background:

booking.status==="CONFIRMED"

?

"#dcfce7"

:

booking.status==="CANCELLED"

?

"#fee2e2"

:

"#fff7ed",

color:

booking.status==="CONFIRMED"

?

"#166534"

:

booking.status==="CANCELLED"

?

"#b91c1c"

:

"#9a3412",

padding:"10px 18px",
borderRadius:"30px",
fontWeight:"600"
}}
>

{booking.status}

</span>

</div>

<hr/>

<div className="row">

<div className="col-6 mb-4">

<b>Passenger</b>

<p>

{booking.passengerName}

</p>

</div>

<div className="col-6 mb-4">

<b>Seats</b>

<p>

{booking.seatsBooked}

</p>

</div>

<div className="col-6 mb-4">

<b>Date</b>

<p>

{booking.ride?.date}

</p>

</div>

<div className="col-6 mb-4">

<b>Time</b>

<p>

{booking.ride?.time}

</p>

</div>

<div className="col-12">

<b>Fare</b>

<p>

₹{booking.ride?.fare}

</p>

</div>

</div>

{
(
booking.status==="PENDING"
||
booking.status==="APPROVED"
)
&&
<div className="row mt-3">
{

booking.status==="APPROVED"

&&

<div className="mt-3">

<button

className="btn btn-success w-100"

style={{
padding:"12px",
borderRadius:"12px"
}}

onClick={()=>

completeRide(
booking.id
)

}

>

Complete Ride

</button>

</div>

}
<div className="col-6">

<button
className="btn w-100"
style={{
background:"#f97316",
color:"white",
padding:"12px",
borderRadius:"12px"
}}
onClick={()=>
approveBooking(
booking.id
)
}
>

Approve

</button>

</div>

<div className="col-6">

<button
className="btn btn-danger w-100"
style={{
padding:"12px",
borderRadius:"12px"
}}
onClick={()=>
rejectBooking(
booking.id
)
}
>

Reject

</button>

</div>

</div>

}

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

export default ViewBookings;