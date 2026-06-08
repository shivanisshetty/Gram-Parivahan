import React from "react";
import Profile from "./components/Profile";
import PlatformReview from "./components/PlatformReview";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import VerifyDrivers from "./components/verifyDrivers";
import Navbar from "./components/Navbar";

import Home from "./components/Home";

import Register from "./components/Register";

import Login from "./components/Login";

import Dashboard from "./components/Dashboard";

import AddRide from "./components/AddRide";

import SearchRide from "./components/SearchRide";

import MyRides from "./components/MyRides";

import UpdateRide from "./components/UpdateRide";

import MyBookings from "./components/MyBookings";

import ViewBookings from "./components/ViewBookings";

import AddReview from "./components/AddReview";

import DriverReviews from "./components/DriverReviews";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./components/AdminDashboard";
import AdminUsers from "./components/AdminUsers";

import AdminRides from "./components/AdminRides";

import AdminBookings from "./components/AdminBookings";
function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* HOME */}

                <Route
                    path="/"
                    element={<Home />}
                />

                {/* REGISTER */}

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* LOGIN */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* DASHBOARD */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>
                    }
                />

                {/* ADD RIDE */}

                <Route
                    path="/add-ride"
                    element={
                        <ProtectedRoute>

                            <AddRide />

                        </ProtectedRoute>
                    }
                />

                {/* SEARCH RIDE */}

                <Route
                    path="/search"
                    element={
                        <ProtectedRoute>

                            <SearchRide />

                        </ProtectedRoute>
                    }
                />

                {/* MY RIDES */}

                <Route
                    path="/my-rides"
                    element={
                        <ProtectedRoute>

                            <MyRides />

                        </ProtectedRoute>
                    }
                />
            
                {/* UPDATE RIDE */}

                <Route
                    path="/update-ride/:id"
                    element={
                        <ProtectedRoute>

                            <UpdateRide />

                        </ProtectedRoute>
                    }
                />

                {/* MY BOOKINGS */}

                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute>

                            <MyBookings />

                        </ProtectedRoute>
                    }
                />

                {/* VIEW BOOKINGS */}

                <Route
                    path="/view-bookings"
                    element={
                        <ProtectedRoute>

                            <ViewBookings />

                        </ProtectedRoute>
                    }
                />
                <Route

path="/platform-review"

element={<PlatformReview/>}

/>

                {/* ADD REVIEW */}

                <Route
                    path="/add-review"
                    element={
                        <ProtectedRoute>

                            <AddReview />

                        </ProtectedRoute>
                    }
                />

                {/* DRIVER REVIEWS */}

                <Route
                    path="/driver-reviews"
                    element={
                        <ProtectedRoute>

                            <DriverReviews />

                        </ProtectedRoute>
                    }
                />
                <Route

path="/admin-dashboard"

element={

<ProtectedRoute>

<AdminDashboard />

</ProtectedRoute>

}

/>
<Route

path="/admin-users"

element={<AdminUsers />}

/>

<Route

path="/admin-rides"

element={<AdminRides />}

/>

<Route

path="/admin-bookings"

element={<AdminBookings />}

/>

    <Route

path="/profile"

element={<Profile />}

/>
<Route

path="/verify-drivers"

element={<VerifyDrivers />}

/>
            </Routes>
            

        </BrowserRouter>
    );
}

export default App;