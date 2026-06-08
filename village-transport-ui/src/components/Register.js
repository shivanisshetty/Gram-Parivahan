import React, { useState } from "react";
import API from "../axiosConfig";
import { Link } from "react-router-dom";

function Register() {

const [user, setUser] = useState({

name: "",

phone: "",

password: "",

confirmPassword:"",

role: ""

});

const handleChange = (e) => {

setUser({

...user,

[e.target.name]: e.target.value

});

};

const handleSubmit = async (e) => {

e.preventDefault();

if(user.password !== user.confirmPassword){

alert("Passwords do not match");

return;

}

try {

const response = await API.post(

"/api/users/register",

{

name:user.name,

phone:user.phone,

password:user.password,

role:user.role

}

);

alert(

"Registration Successful"

);

console.log(

response.data

);

setUser({

name:"",

phone:"",

password:"",

confirmPassword:"",

role:""

});

} catch (error) {

console.log(error);

alert(

"Registration Failed"

);

}

};

return (

<div
style={{

minHeight:"100vh",

background:
"linear-gradient(180deg,#081229 0%,#172b52 45%,#b45309 100%)",

display:"flex",

alignItems:"center",

justifyContent:"center",

padding:"40px",

position:"relative",

overflow:"hidden"

}}
>

{/* background glow */}

<div
style={{

position:"absolute",

width:"350px",

height:"350px",

borderRadius:"50%",

background:"rgba(255,120,0,.15)",

filter:"blur(60px)",

top:"-120px",

left:"-100px"

}}
/>

<div
style={{

position:"absolute",

width:"300px",

height:"300px",

borderRadius:"50%",

background:"rgba(59,130,246,.18)",

filter:"blur(70px)",

right:"-100px",

bottom:"-100px"

}}
/>

<div className="container">

<div
className="row overflow-hidden rounded-4"
style={{

background:"rgba(15,23,42,.92)",

backdropFilter:"blur(12px)",

boxShadow:"0 20px 60px rgba(0,0,0,.4)"

}}
>

{/* LEFT SIDE */}

<div
className="col-lg-6 d-none d-lg-flex flex-column justify-content-center p-5"
style={{

background:
"linear-gradient(180deg,#0f172a,#1e293b)",

color:"white"

}}
>

<div
style={{

width:"80px",

height:"80px",

borderRadius:"20px",

background:"#f97316",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"32px",

fontWeight:"bold",

marginBottom:"25px"

}}
>

VT

</div>

<h1
style={{

fontSize:"48px",

fontWeight:"700",

lineHeight:"1.2"

}}
>

Join Rural

<br/>

Transport Network

</h1>

<p
style={{

marginTop:"20px",

fontSize:"18px",

color:"#cbd5e1",

lineHeight:"1.8"

}}
>

Register as a passenger or driver and become part of trusted village transportation.

</p>

<div className="mt-4">

<p>✓ Verified Community Users</p>

<p>✓ Secure Authentication</p>

<p>✓ Easy Ride Booking</p>

<p>✓ Trusted Village Network</p>

</div>

</div>

{/* RIGHT SIDE */}

<div className="col-lg-6 p-5 text-white">

<h2
className="text-center mb-4"
style={{

fontWeight:"700"

}}
>

Create Account

</h2>

<form onSubmit={handleSubmit}>

<div className="mb-3">

<label>

Full Name

</label>

<input
type="text"
name="name"
value={user.name}
onChange={handleChange}
required
className="form-control p-3 border-0"
style={{

borderRadius:"12px",

background:"#1e293b",

color:"white"

}}
/>

</div>

<div className="mb-3">

<label>

Phone Number

</label>

<input
type="text"
name="phone"
value={user.phone}
onChange={handleChange}
required
className="form-control p-3 border-0"
style={{

borderRadius:"12px",

background:"#1e293b",

color:"white"

}}
/>

</div>

<div className="mb-3">

<label>

Password

</label>

<input
type="password"
name="password"
value={user.password}
onChange={handleChange}
required
className="form-control p-3 border-0"
style={{

borderRadius:"12px",

background:"#1e293b",

color:"white"

}}
/>

</div>

<div className="mb-3">

<label>

Confirm Password

</label>

<input
type="password"
name="confirmPassword"
value={user.confirmPassword}
onChange={handleChange}
required
className="form-control p-3 border-0"
style={{

borderRadius:"12px",

background:"#1e293b",

color:"white"

}}
/>

</div>

<div className="mb-4">

<label>

Register As

</label>

<select
name="role"
value={user.role}
onChange={handleChange}
required
className="form-select p-3 border-0"
style={{

borderRadius:"12px",

background:"#1e293b",

color:"white"

}}
>

<option value="">

Select Role

</option>

<option value="PASSENGER">

Passenger

</option>

<option value="DRIVER">

Driver

</option>

</select>

</div>

<button
type="submit"
className="btn w-100 p-3"
style={{

background:"#f97316",

border:"none",

color:"white",

fontWeight:"700",

borderRadius:"12px"

}}
>

Create Account

</button>

<p className="text-center mt-4">

Already have an account?

<Link
to="/login"
className="ms-2"
style={{

color:"#f97316",

textDecoration:"none"

}}
>

Login

</Link>

</p>

</form>

</div>

</div>

</div>

</div>

);

}

export default Register;