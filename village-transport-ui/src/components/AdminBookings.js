import React, { useEffect, useState } from "react";
import API from "../axiosConfig";

function AdminBookings() {

const [bookings, setBookings] = useState([]);

useEffect(() => {

fetchBookings();

}, []);

const fetchBookings = async () => {

try{

const response = await API.get(
"/api/admin/bookings"
);

setBookings(
response.data
);

}catch(error){

console.log(error);

}

};

const theme = {

page:{
minHeight:"100vh",
background:
"linear-gradient(180deg,#08152f 0%, #14284f 25%, #f6f7fb 25%)",
padding:"30px"
},

hero:{
background:
"linear-gradient(135deg,#1b0d08,#2b1609,#4b2207)",
padding:"45px",
borderRadius:"28px",
color:"white",
boxShadow:
"0 20px 50px rgba(0,0,0,.25)"
},

bookingCard:{
background:"white",
borderRadius:"22px",
padding:"25px",
boxShadow:
"0 10px 30px rgba(0,0,0,.08)",
height:"100%"
},

badge:{
padding:"8px 16px",
borderRadius:"20px",
background:"#f97316",
color:"white",
fontWeight:"600"
}

};

return (

<div style={theme.page}>

<div className="container-fluid">

{/* HERO */}

<div style={theme.hero} className="mb-5">

<h1
style={{
fontSize:"45px",
fontWeight:"800"
}}
>

Manage Bookings

</h1>

<p
style={{
color:"#d1d5db",
fontSize:"18px"
}}
>

Monitor passenger bookings and ride reservations.

</p>

<span style={theme.badge}>

Total Bookings : {bookings.length}

</span>

</div>

{/* BOOKINGS LIST */}

<div className="row g-4">

{

bookings.map((booking)=>(

<div
className="col-md-4"
key={booking.id}
>

<div style={theme.bookingCard}>

<h5
style={{
fontWeight:"700",
marginBottom:"15px"
}}
>

Passenger Details

</h5>

<p>

<strong>Passenger:</strong>

{booking.passengerName}

</p>

<p>

<strong>Seats Booked:</strong>

{booking.seatsBooked}

</p>

<p>

<strong>Booking ID:</strong>

{booking.id}

</p>

</div>

</div>

))

}

</div>

</div>

</div>

);

}

export default AdminBookings;