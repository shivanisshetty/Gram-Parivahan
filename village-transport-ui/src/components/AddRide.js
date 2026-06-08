import React, { useState } from "react";
import API from "../axiosConfig";

function AddRide() {

const user = JSON.parse(
localStorage.getItem("user")
);

const [ride,setRide] = useState({

source:"",
destination:"",
date:"",
time:"",
availableSeats:"",
fare:"",
driverName:user.name

});

const handleChange = (e) => {

setRide({

...ride,

[e.target.name]:e.target.value

});

};

const handleSubmit = async(e)=>{

e.preventDefault();

try{

const response = await API.post(

"/api/rides",

ride

);

if(

response.status===200 ||

response.status===201

){

alert(

"Ride Added Successfully"

);

setRide({

source:"",
destination:"",
date:"",
time:"",
availableSeats:"",
fare:"",
driverName:user.name

});

}

}catch(error){

console.log(error);

alert(

error.response?.data?.message ||

"Only verified drivers can add rides"

);

}

};

return(

<div
style={{
minHeight:"100vh",
background:"linear-gradient(180deg,#08152f 0%, #14284f 25%, #f3f4f6 25%)",
padding:"40px"
}}
>

<div className="container">

<div
style={{
background:"linear-gradient(135deg,#1b0d08,#4b2207)",
padding:"35px",
borderRadius:"25px",
color:"white",
marginBottom:"30px",
boxShadow:"0 15px 40px rgba(0,0,0,.25)"
}}
>

<h1
style={{
fontWeight:"800"
}}
>

Publish New Ride

</h1>

<p
style={{
opacity:"0.8"
}}
>

Create rides for passengers travelling in your route.

</p>

</div>

<div
style={{
background:"white",
padding:"40px",
borderRadius:"25px",
boxShadow:"0 10px 30px rgba(0,0,0,.08)"
}}
>

<form onSubmit={handleSubmit}>

<div className="row">

<div className="col-md-6 mb-4">

<label className="fw-bold">

Source

</label>

<input
type="text"
name="source"
className="form-control p-3"
placeholder="Enter pickup location"
value={ride.source}
onChange={handleChange}
required
/>

</div>

<div className="col-md-6 mb-4">

<label className="fw-bold">

Destination

</label>

<input
type="text"
name="destination"
className="form-control p-3"
placeholder="Enter destination"
value={ride.destination}
onChange={handleChange}
required
/>

</div>

<div className="col-md-6 mb-4">

<label className="fw-bold">

Travel Date

</label>

<input
type="date"
name="date"
className="form-control p-3"
value={ride.date}
onChange={handleChange}
required
/>

</div>

<div className="col-md-6 mb-4">

<label className="fw-bold">

Departure Time

</label>

<input
type="time"
name="time"
className="form-control p-3"
value={ride.time}
onChange={handleChange}
required
/>

</div>

<div className="col-md-6 mb-4">

<label className="fw-bold">

Available Seats

</label>

<input
type="number"
name="availableSeats"
className="form-control p-3"
placeholder="Seats"
value={ride.availableSeats}
onChange={handleChange}
required
/>

</div>

<div className="col-md-6 mb-4">

<label className="fw-bold">

Fare (₹)

</label>

<input
type="number"
name="fare"
className="form-control p-3"
placeholder="Enter fare"
value={ride.fare}
onChange={handleChange}
required
/>

</div>

</div>

<button

type="submit"

className="btn w-100 p-3"

style={{
background:"#f97316",
color:"white",
fontWeight:"700",
borderRadius:"14px",
fontSize:"18px"
}}

>

Publish Ride

</button>

</form>

</div>

</div>

</div>

);

}

export default AddRide;