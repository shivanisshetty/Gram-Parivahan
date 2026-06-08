import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../axiosConfig";

function AdminDashboard() {

const [stats, setStats] = useState({
users: 0,
drivers: 0,
passengers: 0,
rides: 0,
bookings: 0
});

const [user, setUser] = useState(
JSON.parse(
localStorage.getItem("user")
)
);

useEffect(() => {

const updatedUser =
JSON.parse(
localStorage.getItem("user")
);

setUser(updatedUser);

}, []);

useEffect(() => {
fetchData();
}, []);

const fetchData = async () => {

try {

const usersResponse =
await API.get("/api/admin/users");

const ridesResponse =
await API.get("/api/admin/rides");

const bookingsResponse =
await API.get("/api/admin/bookings");

const users = usersResponse.data;

setStats({

users: users.length,

drivers:
users.filter(
u => u.role === "DRIVER"
).length,

passengers:
users.filter(
u => u.role === "PASSENGER"
).length,

rides:
ridesResponse.data.length,

bookings:
bookingsResponse.data.length

});

} catch (error) {

console.log(error);

}

};

const theme = {

page:{
minHeight:"100vh",
background:"linear-gradient(180deg,#08152f 0%, #14284f 25%, #f6f7fb 25%)",
padding:"30px"
},

hero:{
background:"linear-gradient(135deg,#1b0d08,#2b1609,#4b2207)",
color:"white",
padding:"50px",
borderRadius:"28px",
boxShadow:"0 20px 50px rgba(0,0,0,.25)",
overflow:"hidden",
minHeight:"250px"
},

card:{
border:"none",
borderRadius:"22px",
padding:"30px",
boxShadow:"0 10px 30px rgba(0,0,0,.08)",
background:"white",
height:"100%"
},

actionCard:{
padding:"25px",
borderRadius:"20px",
textAlign:"center",
background:"white",
height:"180px",
boxShadow:"0 6px 20px rgba(0,0,0,.08)",
cursor:"pointer",
transition:"0.3s"
},

badge:{
padding:"10px 22px",
borderRadius:"30px",
background:"#f97316",
color:"white",
fontWeight:"600"
}

};

return (

<div style={theme.page}>

<div className="container-fluid px-3 px-md-4">

{/* HERO */}

<div style={theme.hero} className="mb-5">

<div className="row align-items-center">

<div className="col-md-8">

<div
style={{
display:"inline-block",
padding:"8px 18px",
background:"rgba(249,115,22,.15)",
borderRadius:"30px",
marginBottom:"20px"
}}
>

Admin Panel

</div>

<h1
style={{
fontSize:"50px",
fontWeight:"800"
}}
>

Hello, {user?.name}

</h1>

<p
style={{
color:"#d1d5db",
fontSize:"18px"
}}
>

Manage users, rides, bookings and transportation activities easily.

</p>

<span style={theme.badge}>

ADMIN

</span>

</div>

<div className="col-md-4 text-center text-md-end">

{
user?.profilePhoto ?

<img
src={user.profilePhoto}
alt="Profile"
onError={(e)=>{
e.target.style.display="none";
}}
style={{
width:"110px",
height:"110px",
borderRadius:"50%",
objectFit:"cover",
border:"4px solid #f97316"
}}
/>

:

<div
style={{
width:"110px",
height:"110px",
borderRadius:"50%",
background:"#f97316",
display:"inline-flex",
alignItems:"center",
justifyContent:"center",
fontSize:"45px",
fontWeight:"700"
}}
>

{user?.name?.charAt(0)?.toUpperCase()}

</div>

}

</div>

</div>

</div>

{/* STATS */}

<div className="row g-4 mb-5">

<div className="col-md-4">

<div style={theme.card}>

<h6>Total Users</h6>

<h2>{stats.users}</h2>

</div>

</div>

<div className="col-md-4">

<div style={theme.card}>

<h6>Drivers</h6>

<h2>{stats.drivers}</h2>

</div>

</div>

<div className="col-md-4">

<div style={theme.card}>

<h6>Passengers</h6>

<h2>{stats.passengers}</h2>

</div>

</div>

<div className="col-md-6">

<div style={theme.card}>

<h6>Total Rides</h6>

<h2>{stats.rides}</h2>

</div>

</div>

<div className="col-md-6">

<div style={theme.card}>

<h6>Total Bookings</h6>

<h2>{stats.bookings}</h2>

</div>

</div>

</div>

{/* QUICK ACTIONS */}

<div
style={{
background:"white",
padding:"40px",
borderRadius:"25px",
boxShadow:"0 10px 35px rgba(0,0,0,.08)",
marginTop:"20px"
}}
>

<h2 className="mb-4">

Admin Controls

</h2>

<div className="row g-4">

<div className="col-md-3">

<Link
to="/admin-users"
className="text-decoration-none"
>

<div style={theme.actionCard}>

<h2>👤</h2>

<h5>Users</h5>

<p>Manage users</p>

</div>

</Link>

</div>

<div className="col-md-3">

<Link
to="/admin-rides"
className="text-decoration-none"
>

<div style={theme.actionCard}>

<h2>🚗</h2>

<h5>Rides</h5>

<p>Manage rides</p>

</div>

</Link>

</div>

<div className="col-md-3">

<Link
to="/admin-bookings"
className="text-decoration-none"
>

<div style={theme.actionCard}>

<h2>📑</h2>

<h5>Bookings</h5>

<p>View bookings</p>

</div>

</Link>

</div>

<div className="col-md-3">

<Link
to="/verify-drivers"
className="text-decoration-none"
>

<div style={theme.actionCard}>

<h2>✔</h2>

<h5>Verify Drivers</h5>

<p>Approve drivers</p>

</div>

</Link>

</div>

</div>

</div>

</div>

</div>

);

}

export default AdminDashboard;