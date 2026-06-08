import React, { useEffect, useState } from "react";
import API from "../axiosConfig";

function AdminRides() {

const [rides, setRides] = useState([]);

useEffect(() => {

fetchRides();

}, []);

const fetchRides = async () => {

try{

const response = await API.get(
"/api/admin/rides"
);

setRides(
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

rideCard:{
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
},

route:{
fontSize:"20px",
fontWeight:"700",
marginBottom:"15px"
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

Manage Rides

</h1>

<p
style={{
color:"#d1d5db",
fontSize:"18px"
}}
>

Monitor all rides available in the platform.

</p>

<span style={theme.badge}>

Total Rides : {rides.length}

</span>

</div>

{/* RIDE LIST */}

<div className="row g-4">

{

rides.map((ride)=>(

<div
className="col-md-4"
key={ride.id}
>

<div style={theme.rideCard}>

<div style={theme.route}>

{ride.source}

{" → "}

{ride.destination}

</div>

<p>

<strong>Driver:</strong>

{ride.driverName}

</p>

<p>

<strong>Ride ID:</strong>

{ride.id}

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

export default AdminRides;