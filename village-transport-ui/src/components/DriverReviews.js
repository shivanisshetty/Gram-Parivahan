import React, { useEffect, useState } from "react";
import API from "../axiosConfig";
function DriverReviews() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        fetchReviews();

// eslint-disable-next-line
    }, []);

    const fetchReviews = async () => {

        try {

            const response = await API.get(
                "/api/reviews"
            );

            setReviews(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed To Load Reviews");
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

Passenger Feedback

</div>

<h1
style={{
fontSize:"58px",
fontWeight:"800"
}}
>

Driver Reviews

</h1>

<p
style={{
fontSize:"18px",
color:"#d1d5db"
}}
>

See passenger feedback and improve ride experience.

</p>

</div>

{

reviews.length===0 ?

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

No Reviews Available

</h2>

<p>

Passenger feedback will appear here

</p>

</div>

:

<div className="row g-5">

{

reviews.map((review)=>(

<div
className="col-lg-6"
key={review.id}
>

<div
style={{
background:"rgba(255,255,255,.96)",
padding:"30px",
borderRadius:"28px",
backdropFilter:"blur(10px)",
boxShadow:"0 12px 35px rgba(0,0,0,.25)",
height:"100%"
}}
>

<div className="d-flex justify-content-between align-items-center">

<div>

<h4
style={{
fontWeight:"700"
}}
>

{review.passengerName}

</h4>

<p
style={{
color:"#6b7280",
marginBottom:"0"
}}
>

Passenger Review

</p>

</div>

<div
style={{
background:"#dcfce7",
color:"#166534",
padding:"10px 16px",
borderRadius:"30px",
fontWeight:"700"
}}
>

⭐ {review.rating}/5

</div>

</div>

<hr/>

<div
style={{
fontSize:"17px",
lineHeight:"1.8",
color:"#374151",
marginBottom:"25px"
}}
>

"{review.comment}"

</div>

<div
style={{
background:"#f8fafc",
padding:"20px",
borderRadius:"18px"
}}
>

<div className="row">

<div className="col-6 mb-3">

<b>Source</b>

<p>

{review.ride?.source}

</p>

</div>

<div className="col-6 mb-3">

<b>Destination</b>

<p>

{review.ride?.destination}

</p>

</div>

<div className="col-6">

<b>Date</b>

<p>

{review.ride?.date}

</p>

</div>

<div className="col-6">

<b>Time</b>

<p>

{review.ride?.time}

</p>

</div>

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

export default DriverReviews;