import React, { useState } from "react";
import API from "../axiosConfig";

function PlatformReview() {

const user =
JSON.parse(
localStorage.getItem("user")
);

const [review,setReview] = useState({

userName:user?.name || "",

role:user?.role || "",

profilePhoto:user?.profilePhoto || "",

location:"",

rating:5,

review:"",

reviewDate:new Date()
.toLocaleDateString()

});

const handleChange=(e)=>{

setReview({

...review,

[e.target.name]:
e.target.value

});

};

const submitReview = async(e)=>{

e.preventDefault();

try{

const token =
localStorage.getItem("token");

await API.post(

"/api/platform-reviews",

review,

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);

alert(
"Review Added Successfully"
);

setReview({

...review,

location:"",

rating:5,

review:""

});

}catch(error){

console.log(error);

alert(
"Failed To Add Review"
);

}

};

return(

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
padding:"45px",
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
marginBottom:"18px"
}}
>

Platform Feedback

</div>

<h1
style={{
fontSize:"55px",
fontWeight:"800"
}}
>

Share Your Experience

</h1>

<p
style={{
fontSize:"18px",
color:"#d1d5db"
}}
>

Help improve transport services by sharing feedback.

</p>

</div>

{/* CARD */}

<div
style={{
background:"white",
padding:"40px",
borderRadius:"30px",
boxShadow:
"0 12px 35px rgba(0,0,0,.12)"
}}
>

{/* USER PREVIEW */}

<div
className="d-flex align-items-center mb-4"
>

{

review.profilePhoto ?

<img

src={review.profilePhoto}

alt=""

style={{

width:"70px",

height:"70px",

borderRadius:"50%",

objectFit:"cover",

border:"3px solid #f97316"

}}

/>

:

<div
style={{
width:"70px",
height:"70px",
borderRadius:"50%",
background:"#f97316",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"28px",
fontWeight:"700",
color:"white"
}}
>

{review.userName?.charAt(0)}

</div>

}

<div className="ms-3">

<h4>

{review.userName}

</h4>

<p className="text-secondary">

{review.role}

</p>

</div>

</div>

<form onSubmit={submitReview}>

<label className="fw-bold">

Location

</label>

<input

className="form-control p-3 mb-4"

name="location"

value={review.location}

onChange={handleChange}

required

/>

<label className="fw-bold">

Rating

</label>

<select

className="form-select p-3 mb-4"

name="rating"

value={review.rating}

onChange={handleChange}

>

<option value="5">

⭐⭐⭐⭐⭐ Excellent

</option>

<option value="4">

⭐⭐⭐⭐ Good

</option>

<option value="3">

⭐⭐⭐ Average

</option>

<option value="2">

⭐⭐ Poor

</option>

<option value="1">

⭐ Bad

</option>

</select>

<label className="fw-bold">

Review

</label>

<textarea

rows="5"

className="form-control p-3 mb-4"

name="review"

value={review.review}

onChange={handleChange}

required

/>

<button

className="btn w-100"

style={{
background:"#f97316",
color:"white",
padding:"14px",
fontWeight:"600",
borderRadius:"12px"
}}
>

Submit Review

</button>

</form>

</div>

</div>

</div>

);

}

export default PlatformReview;