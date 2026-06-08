import React, { useEffect, useState } from "react";
import API from "../axiosConfig";
import { Link } from "react-router-dom";

function Dashboard() {

    const [stats, setStats] = useState({

        totalUsers: 0,

        totalRides: 0,

        totalBookings: 0
    });

    const user = JSON.parse(

        localStorage.getItem(
            "user"
        )
    );

    useEffect(() => {

        fetchStats();

        // eslint-disable-next-line

    }, []);

    const fetchStats = async () => {

    try {

        let ridesResponse;

        let bookingsResponse;

        if (user.role === "DRIVER") {

            ridesResponse = await API.get(

                `/api/rides/my-rides/${user.name}`
            );

            bookingsResponse = await API.get(

                `/api/bookings/driver/${user.name}`
            );

        } else {

            /* ALL RIDES */

            ridesResponse = await API.get(

                "/api/rides"
            );

            bookingsResponse = await API.get(

                `/api/bookings/passenger/${user.name}`
            );
        }

        console.log(

            "RIDES DATA",

            ridesResponse.data
        );

        setStats({

            totalRides:

                Array.isArray(
                    ridesResponse.data
                )

                ?

                ridesResponse.data.length

                :

                0,

            totalBookings:

                Array.isArray(
                    bookingsResponse.data
                )

                ?

                bookingsResponse.data.length

                :

                0,

            totalUsers: 0
        });

    } catch (error) {

       console.log(error.response);
console.log(error.response?.data);
console.log(error.response?.status);

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
border:"1px solid rgba(255,255,255,.08)",
color:"white",
borderRadius:"28px",
padding:"50px",
boxShadow:"0 20px 50px rgba(0,0,0,.25)"
},

card:{
border:"none",
borderRadius:"22px",
padding:"28px",
boxShadow:"0 10px 30px rgba(0,0,0,.08)"
},

actionCard:{
border:"none",
borderRadius:"22px",
padding:"30px",
textAlign:"center",
transition:"0.3s",
background:"white",
color:"#111"
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
<div className="container-fluid">

{/* HERO SECTION */}

<div style={theme.hero} className="mb-5">

<div className="row align-items-center">

<div className="col-md-8">

<div
style={{
display:"inline-block",
padding:"8px 18px",
background:"rgba(249,115,22,.15)",
borderRadius:"30px",
marginBottom:"18px"
}}
>

Welcome Back

</div>

<h1
style={{
fontSize:"50px",
fontWeight:"800"
}}
>

Hello,

{user?.name}

</h1>

<p
style={{
color:"#d1d5db",
fontSize:"18px",
marginTop:"15px"
}}
>

Manage rides, bookings and transportation activities easily.

</p>

<span style={theme.badge}>

{user?.role}

</span>

</div>

<div className="col-md-4 text-end">

{
user?.profilePhoto ?

<img
src={user.profilePhoto}
alt=""
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

{user?.name?.charAt(0)}

</div>

}

</div>

</div>

</div>
</div>

{/* STATS */}

<div className="row g-4 mb-5">

<div className="col-md-4">

<div style={theme.card}>

<h6 className="text-muted">

Bookings

</h6>

<h2 className="fw-bold">

{stats.totalBookings}

</h2>

<p className="text-secondary">

{

user?.role==="DRIVER"

?

"Passengers booked"

:

"My bookings"

}

</p>

</div>

</div>

<div className="col-md-4">

<div style={theme.card}>

<h6 className="text-muted">

Rides

</h6>

<h2 className="fw-bold">

{stats.totalRides}

</h2>

<p className="text-secondary">

{

user?.role==="DRIVER"

?

"My rides"

:

"Available rides"

}

</p>

</div>

</div>

<div className="col-md-4">

<div style={theme.card}>

<h6 className="text-muted">

Activity

</h6>

<h2 className="fw-bold">

{

user?.role==="DRIVER"

?

"Active"

:

"Ready"

}

</h2>

<p className="text-secondary">

Platform Status

</p>

</div>

</div>

</div>

{/* QUICK ACTIONS */}

<div
style={{
background:"white",
borderRadius:"25px",
padding:"40px",
boxShadow:"0 10px 35px rgba(0,0,0,.08)",
marginBottom:"40px"
}}
>

<h2
style={{
fontWeight:"700",
marginBottom:"35px"
}}
>

Quick Actions

</h2>

<div className="row g-4">

{
user?.role==="DRIVER"
&&
<>

<div className="col-md-3">

<Link
to="/add-ride"
className="text-decoration-none"
>

<div
style={{
background:"#fff7ed",
padding:"30px",
borderRadius:"20px",
textAlign:"center",
height:"180px",
border:"1px solid #fed7aa",
transition:"0.3s"
}}
>

<div
style={{
width:"60px",
height:"60px",
background:"#f97316",
borderRadius:"15px",
margin:"auto",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"28px",
color:"white"
}}
>

+

</div>

<h5 className="mt-4">

Add Ride

</h5>

<p className="text-secondary">

Publish new rides

</p>

</div>

</Link>

</div>

<div className="col-md-3">

<Link
to="/my-rides"
className="text-decoration-none"
>

<div
style={{
background:"#eff6ff",
padding:"30px",
borderRadius:"20px",
textAlign:"center",
height:"180px"
}}
>

<div style={{fontSize:"45px"}}>

⌕

</div>

<h5>

My Rides

</h5>

<p className="text-secondary">

Manage rides

</p>

</div>

</Link>

</div>

<div className="col-md-3">

<Link
to="/view-bookings"
className="text-decoration-none"
>

<div
style={{
background:"#f0fdf4",
padding:"30px",
borderRadius:"20px",
textAlign:"center",
height:"180px"
}}
>

<div style={{fontSize:"45px"}}>

▤

</div>

<h5>

Bookings

</h5>

<p className="text-secondary">

Passenger requests

</p>

</div>

</Link>

</div>

<div className="col-md-3">

<Link
to="/driver-reviews"
className="text-decoration-none"
>

<div
style={{
background:"#faf5ff",
padding:"30px",
borderRadius:"20px",
textAlign:"center",
height:"180px"
}}
>

<div style={{fontSize:"45px"}}>

★

</div>

<h5>

Reviews

</h5>

<p className="text-secondary">

Passenger feedback

</p>

</div>

</Link>

</div>

</>

}
{

user?.role==="PASSENGER"

&&

<>

<div className="col-md-3">

<Link
to="/search"
className="text-decoration-none"
>

<div
style={{
background:"#eff6ff",
padding:"30px",
borderRadius:"20px",
textAlign:"center",
height:"180px",
border:"1px solid #bfdbfe"
}}
>

<div
style={{
width:"60px",
height:"60px",
background:"#2563eb",
borderRadius:"15px",
margin:"auto",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"28px",
color:"white"
}}
>

⌕

</div>

<h5 className="mt-4">

Search Ride

</h5>

<p className="text-secondary">

Find available rides

</p>

</div>

</Link>

</div>

<div className="col-md-3">

<Link
to="/my-bookings"
className="text-decoration-none"
>

<div
style={{
background:"#f0fdf4",
padding:"30px",
borderRadius:"20px",
textAlign:"center",
height:"180px",
border:"1px solid #bbf7d0"
}}
>

<div
style={{
width:"60px",
height:"60px",
background:"#16a34a",
borderRadius:"15px",
margin:"auto",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"28px",
color:"white"
}}
>

▤

</div>

<h5 className="mt-4">

My Bookings

</h5>

<p className="text-secondary">

View booking history

</p>

</div>

</Link>

</div>

<div className="col-md-3">

<Link
to="/add-review"
className="text-decoration-none"
>

<div
style={{
background:"#faf5ff",
padding:"30px",
borderRadius:"20px",
textAlign:"center",
height:"180px",
border:"1px solid #ddd6fe"
}}
>

<div
style={{
width:"60px",
height:"60px",
background:"#9333ea",
borderRadius:"15px",
margin:"auto",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"28px",
color:"white"
}}
>

★

</div>

<h5 className="mt-4">

Add Review

</h5>

<p className="text-secondary">

Share your experience

</p>

</div>

</Link>

</div>

<div className="col-md-3">

<Link
to="/profile"
className="text-decoration-none"
>

<div
style={{
background:"#fff7ed",
padding:"30px",
borderRadius:"20px",
textAlign:"center",
height:"180px",
border:"1px solid #fed7aa"
}}
>

<div
style={{
width:"60px",
height:"60px",
background:"#f97316",
borderRadius:"15px",
margin:"auto",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"28px",
color:"white"
}}
>

☺

</div>

<h5 className="mt-4">

Profile

</h5>

<p className="text-secondary">

Manage account

</p>

</div>

</Link>

</div>

</>

}

</div>

</div>

</div>

);
}

export default Dashboard;