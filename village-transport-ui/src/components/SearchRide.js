// import React, { useState } from "react";
// import API from "../axiosConfig";

// function SearchRide() {

//     const [source, setSource] = useState("");
//     const [destination, setDestination] = useState("");

//     const [rides, setRides] = useState([]);

//     const searchRides = async () => {

//         try {

//             const response = await API.get(
//                 `/api/rides/search?source=${source}&destination=${destination}`
//             );

//             setRides(response.data);

//         } catch (error) {

//             console.error(error);

//             alert("Failed To Search Rides");
//         }
//     };

//    const bookRide = async (ride) => {

// const passengerName = prompt(

// "Enter Passenger Name"

// );

// if (!passengerName) {

// return;

// }

// const paymentMethod = prompt(

// "Choose payment: CASH or ONLINE"

// );

// if (!paymentMethod) {

// return;

// }

// try {

// const bookingData = {

// passengerName: passengerName,

// seatsBooked: 1,

// paymentMethod: paymentMethod

// };
// console.log(bookingData);
// const response = await API.post(

// `/api/bookings/${ride.id}`,

// bookingData

// );

// alert(

// typeof response.data === "string"

// ?

// response.data

// :

// JSON.stringify(
// response.data
// )

// );
// searchRides();

// }

// catch (error) {

// console.log(error);

// console.log(
// error.response?.data
// );

// alert(

// error.response?.data?.message ||

// error.response?.data ||

// "Booking Failed"

// );

// }

// };

//    return(

// <div
// style={{
// minHeight:"100vh",
// background:
// "linear-gradient(180deg,#eef4ff 0%,#e7eefc 40%,#ffffff 100%)",
// padding:"30px"
// }}
// >

// <div className="container">

// {/* HERO */}

// <div
// style={{
// background:
// "linear-gradient(135deg,#1b0d08,#321408,#5a2405)",
// padding:"50px",
// borderRadius:"35px",
// color:"white",
// marginBottom:"40px",
// boxShadow:
// "0 20px 50px rgba(0,0,0,.25)"
// }}
// >

// <div
// style={{
// display:"inline-block",
// padding:"10px 20px",
// background:"rgba(249,115,22,.15)",
// borderRadius:"30px",
// marginBottom:"20px"
// }}
// >

// Ride Search

// </div>

// <h1
// style={{
// fontSize:"58px",
// fontWeight:"800"
// }}
// >

// Find Your Ride

// </h1>

// <p
// style={{
// fontSize:"18px",
// color:"#d1d5db"
// }}
// >

// Search available rides and travel safely.

// </p>

// </div>

// {/* SEARCH CARD */}

// <div
// style={{
// background:"white",
// padding:"35px",
// borderRadius:"30px",
// boxShadow:"0 12px 35px rgba(0,0,0,.1)",
// marginBottom:"45px"
// }}
// >

// <div className="row g-4">

// <div className="col-md-5">

// <label className="fw-bold mb-2">

// Source

// </label>

// <input

// type="text"

// className="form-control p-3"

// placeholder="Enter pickup"

// value={source}

// onChange={(e)=>
// setSource(
// e.target.value
// )
// }

// />

// </div>

// <div className="col-md-5">

// <label className="fw-bold mb-2">

// Destination

// </label>

// <input

// type="text"

// className="form-control p-3"

// placeholder="Enter destination"

// value={destination}

// onChange={(e)=>
// setDestination(
// e.target.value
// )
// }

// />

// </div>

// <div className="col-md-2 d-flex align-items-end">

// <button

// className="btn w-100"

// style={{
// background:"#f97316",
// color:"white",
// padding:"14px",
// fontWeight:"600",
// borderRadius:"12px"
// }}

// onClick={searchRides}

// >

// Search

// </button>

// </div>

// </div>

// </div>

// <h2
// style={{
// fontWeight:"700",
// marginBottom:"30px"
// }}
// >

// Available Rides

// </h2>

// {

// rides.length===0 ?

// <div
// style={{
// background:"white",
// padding:"60px",
// borderRadius:"25px",
// textAlign:"center",
// boxShadow:"0 10px 25px rgba(0,0,0,.08)"
// }}
// >

// <h3>

// No rides found

// </h3>

// <p>

// Try another route

// </p>

// </div>

// :

// <div className="row g-4">

// {

// rides.map((ride)=>(

// <div
// className="col-lg-6"
// key={ride.id}
// >

// <div
// style={{
// background:"white",
// padding:"30px",
// borderRadius:"25px",
// boxShadow:"0 12px 30px rgba(0,0,0,.08)",
// height:"100%"
// }}
// >

// <div className="d-flex justify-content-between align-items-center">

// <div className="d-flex align-items-center">

// {

// ride.profilePhoto ?

// <img

// src={ride.profilePhoto}

// alt=""

// style={{
// width:"75px",
// height:"75px",
// borderRadius:"50%",
// objectFit:"cover",
// marginRight:"15px",
// border:"3px solid #f97316"
// }}

// />

// :

// <div
// style={{
// width:"75px",
// height:"75px",
// borderRadius:"50%",
// background:"#f97316",
// display:"flex",
// alignItems:"center",
// justifyContent:"center",
// color:"white",
// fontSize:"28px",
// fontWeight:"700",
// marginRight:"15px"
// }}
// >

// {ride.driverName?.charAt(0)}

// </div>

// }

// <div>

// <h5>

// {ride.driverName}

// {

// ride.driverVerified &&

// <span
// className="badge bg-success ms-2"
// >

// Verified

// </span>

// }

// </h5>

// <p className="text-secondary">

// {ride.driverContact}

// </p>

// </div>

// </div>

// <h3 style={{color:"#16a34a"}}>

// ₹{ride.fare}

// </h3>

// </div>

// <hr/>

// <div className="row">

// <div className="col-6">

// <p>

// <b>

// Route

// </b>

// </p>

// <p>

// {ride.source}

// →

// {ride.destination}

// </p>

// </div>

// <div className="col-6">

// <p>

// <b>

// Seats

// </b>

// </p>

// <p>

// {ride.availableSeats}

// </p>

// </div>

// <div className="col-6">

// <p>

// <b>

// Vehicle

// </b>

// </p>

// <p>

// {ride.VehicleName}

// </p>

// </div>

// <div className="col-6">

// <p>

// <b>

// Number

// </b>

// </p>

// <p>

// {ride.VehicleNumber}

// </p>

// </div>

// <div className="col-6">

// <p>

// <b>

// Date

// </b>

// </p>

// <p>

// {ride.date}

// </p>

// </div>

// <div className="col-6">

// <p>

// <b>

// Time

// </b>

// </p>

// <p>

// {ride.time}

// </p>

// </div>

// </div>

// <button

// className="btn w-100 mt-3"

// style={{
// background:"#16a34a",
// color:"white",
// padding:"14px",
// borderRadius:"12px",
// fontWeight:"600"
// }}

// onClick={()=>
// bookRide(
// ride.id
// )
// }

// >

// Book Ride

// </button>

// </div>

// </div>

// ))

// }

// </div>

// }

// </div>

// </div>

// );
// }

// export default SearchRide;
import React, { useState } from "react";
import API from "../axiosConfig";

function SearchRide() {

const [source, setSource] = useState("");
const [destination, setDestination] = useState("");
const [rides, setRides] = useState([]);

const searchRides = async () => {

try {

const response = await API.get(

`/api/rides/search?source=${source}&destination=${destination}`

);

console.log(response.data);

setRides(response.data);

} catch (error) {

console.error(error);

alert("Failed To Search Rides");

}

};

const bookRide = async (ride) => {

const user = JSON.parse(

localStorage.getItem("user")

);

const passengerName = user.name;
if (!passengerName) return;

const paymentMethod = prompt(
"Choose payment method: CASH or ONLINE"
);

if (!paymentMethod) return;

try {

const bookingData = {

passengerName,

seatsBooked: 1,

paymentMethod:

paymentMethod.toUpperCase(),

paymentStatus:

"PENDING"

};

const response = await API.post(

`/api/bookings/${ride.id}`,

bookingData

);

alert(

typeof response.data === "string"

?

response.data

:

"Booking Request Sent"

);

searchRides();

} catch(error){

console.log(error);

alert(

error.response?.data?.message ||

error.response?.data ||

"Booking Failed"

);

}

};

return (

<div
style={{
minHeight:"100vh",
background:
"linear-gradient(180deg,#eef4ff 0%,#e7eefc 40%,#ffffff 100%)",
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
color:"white",
marginBottom:"40px",
boxShadow:
"0 20px 50px rgba(0,0,0,.25)"
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

Ride Search

</div>

<h1
style={{
fontSize:"58px",
fontWeight:"800"
}}
>

Find Your Ride

</h1>

<p
style={{
fontSize:"18px",
color:"#d1d5db"
}}
>

Search available rides and travel safely.

</p>

</div>

{/* SEARCH */}

<div
style={{
background:"white",
padding:"35px",
borderRadius:"30px",
boxShadow:"0 12px 35px rgba(0,0,0,.1)",
marginBottom:"45px"
}}
>

<div className="row g-4">

<div className="col-md-5">

<input
type="text"
className="form-control p-3"
placeholder="Source"
value={source}
onChange={(e)=>setSource(e.target.value)}
/>

</div>

<div className="col-md-5">

<input
type="text"
className="form-control p-3"
placeholder="Destination"
value={destination}
onChange={(e)=>setDestination(e.target.value)}
/>

</div>

<div className="col-md-2">

<button

className="btn w-100"

style={{
background:"#f97316",
color:"white",
padding:"14px"
}}

onClick={searchRides}

>

Search

</button>

</div>

</div>

</div>

{/* RESULTS */}

<div className="row g-4">

{

rides.length === 0 ?

<div className="text-center">

<h3>No rides found</h3>

</div>

:

rides.map((ride)=>(

<div
className="col-lg-6"
key={ride.id}
>

<div
style={{
background:"white",
padding:"30px",
borderRadius:"25px",
boxShadow:"0 12px 30px rgba(0,0,0,.08)"
}}
>

<div className="d-flex justify-content-between">

<div className="d-flex align-items-center">

{

ride.profilePhoto ?

<img

src={ride.profilePhoto}

alt=""

style={{
width:"75px",
height:"75px",
borderRadius:"50%",
objectFit:"cover",
marginRight:"15px",
border:"3px solid #f97316"
}}

/>

:

<div
style={{
width:"75px",
height:"75px",
borderRadius:"50%",
background:"#f97316",
display:"flex",
alignItems:"center",
justifyContent:"center",
color:"white",
fontSize:"28px",
fontWeight:"700",
marginRight:"15px"
}}
>

{ride.driverName?.charAt(0)}

</div>

}

<div>

<h4>

{ride.driverName}

{

ride.driverVerified &&

<span className="badge bg-success ms-2">

Verified

</span>

}

</h4>

<p>

{ride.driverContact}

</p>

</div>

</div>

<h3 style={{color:"#16a34a"}}>

₹{ride.fare}

</h3>

</div>

<hr/>

<p>

<b>Route:</b>

{ride.source}

→

{ride.destination}

</p>

<p>

<b>Seats:</b>

{ride.availableSeats}

</p>

<p>

<b>Vehicle:</b>

{

ride.VehicleName ||

ride.vehicleName ||

"Not Available"

}

</p>

<p>

<b>Vehicle Number:</b>

{

ride.VehicleNumber ||

ride.vehicleNumber ||

"Not Available"

}

</p>

<p>

<b>Date:</b>

{ride.date}

</p>

<p>

<b>Time:</b>

{ride.time}

</p>

<button

className="btn w-100 mt-3"

style={{
background:"#16a34a",
color:"white",
padding:"14px"
}}

onClick={() => bookRide(ride)}

>

Book Ride

</button>

</div>

</div>

))

}

</div>

</div>

</div>

);

}

export default SearchRide;