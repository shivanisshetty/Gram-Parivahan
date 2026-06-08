import React, { useEffect, useState } from "react";
import API from "../axiosConfig";

function AddReview() {

    const [rides, setRides] = useState([]);

    const [rideId, setRideId] = useState("");

    const [review, setReview] = useState({

        passengerName: "",

        comment: "",

        rating: ""
    });

    useEffect(() => {

        fetchMyBookings();

    }, []);

    const fetchMyBookings = async () => {

        try {

            const user = JSON.parse(

                localStorage.getItem(
                    "user"
                )
            );

            const response = await API.get(

                `/api/bookings/passenger/${user.name}`
            );

            const bookedRides = response.data.map(

                booking => booking.ride
            );

            setRides(bookedRides);

        } catch (error) {

            console.log(error);
        }
    };

    const handleChange = (e) => {

        setReview({

            ...review,

            [e.target.name]:

            e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(

                `/api/reviews/${rideId}`,

                review
            );

            alert(
                "Review Added Successfully"
            );

            setReview({

                passengerName: "",

                comment: "",

                rating: ""
            });

            setRideId("");

        } catch (error) {

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
"linear-gradient(180deg,#eef4ff 0%,#e7eefc 35%,#f5f7fb 70%,#ffffff 100%)",
padding:"30px"
}}
>

<div className="container">

{/* HEADER */}

<div
style={{
background:
"linear-gradient(135deg,#1b0d08,#321408,#5a2405)",
padding:"45px 50px",
borderRadius:"32px",
marginBottom:"40px",
color:"white",
boxShadow:"0 25px 60px rgba(0,0,0,.25)",
minHeight:"260px",
display:"flex",
flexDirection:"column",
justifyContent:"center"
}}
>

<div
style={{
display:"inline-block",
padding:"10px 20px",
background:"rgba(249,115,22,.15)",
borderRadius:"30px",
marginBottom:"20px",
width:"fit-content"
}}
>

Passenger Feedback

</div>

<h1
style={{
fontSize:"56px",
fontWeight:"800"
}}
>

Add Review

</h1>

<p
style={{
fontSize:"18px",
color:"#d1d5db"
}}
>

Share your ride experience with drivers and help improve service.

</p>

</div>

{/* FORM CARD */}

<div
style={{
background:"white",
padding:"40px",
borderRadius:"30px",
boxShadow:"0 12px 35px rgba(0,0,0,.12)"
}}
>

<form onSubmit={handleSubmit}>

<div className="mb-4">

<label className="fw-bold mb-2">

Select Ride

</label>

<select
className="form-select p-3"
value={rideId}
onChange={(e)=>
setRideId(
e.target.value
)
}
required
>

<option value="">

Choose Ride

</option>

{

rides.map((ride)=>(

<option
key={ride.id}
value={ride.id}
>

{ride.source}

{" → "}

{ride.destination}

{" | "}

{ride.date}

</option>

))

}

</select>

</div>

<div className="mb-4">

<label className="fw-bold mb-2">

Passenger Name

</label>

<input
className="form-control p-3"
name="passengerName"
value={review.passengerName}
onChange={handleChange}
required
/>

</div>

<div className="mb-4">

<label className="fw-bold mb-2">

Comment

</label>

<textarea
className="form-control p-3"
rows="5"
name="comment"
value={review.comment}
onChange={handleChange}
required
/>

</div>

<div className="mb-4">

<label className="fw-bold mb-2">

Rating

</label>

<select
className="form-select p-3"
name="rating"
value={review.rating}
onChange={handleChange}
required
>

<option value="">

Choose Rating

</option>

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

</div>

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

export default AddReview;