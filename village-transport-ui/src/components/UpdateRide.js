import React, { useEffect, useState } from "react";
import API from "../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

function UpdateRide() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [ride, setRide] = useState({
        source: "",
        destination: "",
        date: "",
        time: "",
        availableSeats: "",
        fare: ""
    });

    useEffect(() => {

        fetchRide();
        // eslint-disable-next-line
    }, []);

    const fetchRide = async () => {

        try {

            const response = await API.get(
                "/api/rides"
            );

            const selectedRide = response.data.find(
                (r) => r.id === parseInt(id)
            );

            if (selectedRide) {
                setRide(selectedRide);
            }

        } catch (error) {

            console.error(error);

            alert("Failed To Load Ride");
        }
    };

    const handleChange = (e) => {

        setRide({
            ...ride,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.put(
                `/api/rides/${id}`,
                ride
            );

            alert("Ride Updated Successfully");

            navigate("/my-rides");

        } catch (error) {

            console.error(error);

            alert("Failed To Update Ride");
        }
    };

    return (

        <div className="container mt-5">

            <div className="card shadow border-0 p-5">

                <h2 className="mb-4">
                    Update Ride
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label>Source</label>

                        <input
                            type="text"
                            name="source"
                            className="form-control"
                            value={ride.source}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Destination</label>

                        <input
                            type="text"
                            name="destination"
                            className="form-control"
                            value={ride.destination}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Date</label>

                        <input
                            type="date"
                            name="date"
                            className="form-control"
                            value={ride.date}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Time</label>

                        <input
                            type="time"
                            name="time"
                            className="form-control"
                            value={ride.time}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Available Seats</label>

                        <input
                            type="number"
                            name="availableSeats"
                            className="form-control"
                            value={ride.availableSeats}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Fare</label>

                        <input
                            type="number"
                            name="fare"
                            className="form-control"
                            value={ride.fare}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-warning w-100"
                    >
                        Update Ride
                    </button>

                </form>

            </div>

        </div>
    );
}

export default UpdateRide;