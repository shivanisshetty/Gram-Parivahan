import React, { useState } from "react";
import API from "../axiosConfig";
import { useNavigate } from "react-router-dom";
function Login() {

    const [loginData, setLoginData] = useState({
        phone: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await API.post(

            "/api/users/login",

            loginData
        );

        /* SAVE TOKEN */

        localStorage.setItem(

            "token",

            response.data.token
        );

        /* SAVE USER */

        localStorage.setItem(

            "user",

            JSON.stringify({

                name: response.data.name,

                role: response.data.role,
                profilePhoto: response.data.profilePhoto,

verified: response.data.verified
            })
        );
        console.log(response.data);
        alert("Login Successful");

if (

    response.data.role === "ADMIN"

) {

    navigate(

        "/admin-dashboard"
    );

}

else {

    navigate(

        "/dashboard"
    );
}

    } catch (error) {

        console.error(error);

        /* USER NOT FOUND */

        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {

            alert(error.response.data.message);

        } else {

            alert(
                "Please register first"
            );
        }
    }
};
    return(

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

{/* Background Glow */}

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

background:"rgba(59,130,246,.15)",

filter:"blur(70px)",

right:"-80px",

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

background:"#f97316",

borderRadius:"20px",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"30px",

fontWeight:"700",

marginBottom:"25px"

}}
>

VT

</div>

<h1
style={{

fontSize:"46px",

fontWeight:"700",

lineHeight:"1.2"

}}
>

Welcome Back

</h1>

<p
style={{

marginTop:"20px",

fontSize:"18px",

lineHeight:"1.8",

color:"#cbd5e1"

}}
>

Login to access rides, manage bookings and connect with trusted rural transport.

</p>

<div className="mt-4">

<p>✓ Secure Authentication</p>

<p>✓ Verified Drivers</p>

<p>✓ Easy Ride Booking</p>

<p>✓ Community Platform</p>

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

Login Account

</h2>

<form onSubmit={handleSubmit}>

<div className="mb-3">

<label>

Phone Number

</label>

<input
type="text"
name="phone"
value={loginData.phone}
onChange={handleChange}
required
className="form-control p-3 border-0"
style={{

background:"#1e293b",

color:"white",

borderRadius:"12px"

}}
/>

</div>

<div className="mb-4">

<label>

Password

</label>

<input
type="password"
name="password"
value={loginData.password}
onChange={handleChange}
required
className="form-control p-3 border-0"
style={{

background:"#1e293b",

color:"white",

borderRadius:"12px"

}}
/>

</div>

<button
type="submit"
className="btn w-100 p-3"
style={{

background:"#f97316",

border:"none",

fontWeight:"700",

color:"white",

borderRadius:"12px"

}}
>

Login

</button>

<p className="text-center mt-4">

Don't have an account?

<a
href="/register"
style={{

color:"#f97316",

marginLeft:"8px",

textDecoration:"none"

}}
>

Register

</a>

</p>

</form>

</div>

</div>

</div>

</div>

);
}

export default Login;