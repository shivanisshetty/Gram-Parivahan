import React, { useEffect, useState } from "react";
import API from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root{
  --bg: linear-gradient(180deg,#eef4ff 0%,#e7eefc 35%,#f5f7fb 70%,#ffffff 100%);
  --text:#1f2937;
  --text2:#6b7280;
  --text3:#9ca3af;
  --border:#e5e7eb;
  --green:#16a34a;
  --red:#dc2626;
}

@keyframes fadeIn{
  from{ opacity:0; transform:translateY(10px); }
  to{ opacity:1; transform:none; }
}
@keyframes spin{ to{ transform:rotate(360deg); } }

*,*::before,*::after{ box-sizing:border-box; margin:0; padding:0; }

.mb{
  min-height:100vh;
  font-family:'Inter',sans-serif;
  background:var(--bg);
  padding:30px 20px;
  color:var(--text);
}

/* ── HEADER — compact, matches SearchRide ── */
.mb-header{
  background: linear-gradient(135deg,#1b0d08,#321408,#5a2405);
  padding: 32px 40px;
  border-radius: 28px;
  margin-bottom: 36px;
  color: white;
  box-shadow: 0 20px 50px rgba(0,0,0,.25);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 36px;
}
.mb-badge{
  display:inline-block;
  padding:7px 16px;
  background:rgba(249,115,22,.18);
  border-radius:30px;
  font-size:13px;
  font-weight:600;
  margin-bottom:14px;
  color:#fed7aa;
}
.mb-title{
  font-size:38px;
  font-weight:800;
  color:white;
  margin-bottom:6px;
  line-height:1.1;
  padding: 20px;
}
.mb-sub{
  font-size:15px;
  color:#d1d5db;
}

/* ── CONTENT ── */
.mb-content{
  max-width:1200px;
  margin:auto;
}

.mb-card{
  background:rgba(255,255,255,.97);
  padding:26px 28px;
  border-radius:22px;
  box-shadow:0 8px 24px rgba(0,0,0,.09);
  margin-bottom:18px;
  border:none;
  animation:fadeIn .3s ease both;
}

.mb-card-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:18px;
}
.mb-route{
  font-size:20px;
  font-weight:700;
}
.mb-status{
  padding:6px 14px;
  border-radius:30px;
  font-size:12px;
  font-weight:700;
  text-transform:uppercase;
}
.mb-status-confirmed{ background:#dcfce7; color:#166534; }
.mb-status-pending{   background:#fef3c7; color:#92400e; }
.mb-status-cancelled{ background:#fee2e2; color:#991b1b; }
.mb-status-rejected{  background:#fce7f3; color:#9d174d; }

.mb-card-body{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
  gap:16px;
  padding-bottom:16px;
  margin-bottom:16px;
  border-bottom:1px solid var(--border);
}
.mb-info{ display:flex; flex-direction:column; }
.mb-info-label{
  font-size:11px;
  font-weight:700;
  color:var(--text3);
  margin-bottom:4px;
  text-transform:uppercase;
  letter-spacing:.04em;
}
.mb-info-value{ font-size:14px; font-weight:500; }

.mb-fare-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-size:15px;
  font-weight:700;
}
.mb-fare-value{ color:var(--green); font-size:20px; font-weight:800; }

.mb-actions{ margin-top:14px; }
.mb-btn{
  padding:10px 20px;
  border-radius:10px;
  font-size:13px;
  font-weight:600;
  cursor:pointer;
  border:none;
  font-family:'Inter',sans-serif;
  transition:background .15s;
}
.mb-btn-danger{ background:#fee2e2; color:var(--red); }
.mb-btn-danger:hover{ background:#fecaca; }
.mb-btn-danger:disabled{ opacity:.6; cursor:not-allowed; }

/* Loader */
.mb-loader{
  text-align:center;
  padding:70px;
  background:white;
  border-radius:22px;
  box-shadow:0 8px 24px rgba(0,0,0,.08);
}
.mb-spinner{
  width:40px; height:40px;
  border:4px solid #ddd;
  border-top:4px solid #f97316;
  border-radius:50%;
  margin:auto auto 14px;
  animation:spin .7s linear infinite;
}

/* Empty */
.mb-empty{
  background:white;
  padding:70px;
  text-align:center;
  border-radius:22px;
  box-shadow:0 8px 24px rgba(0,0,0,.08);
}
.mb-empty-icon{ font-size:56px; margin-bottom:16px; }

/* Error */
.mb-error{
  padding:14px 18px;
  background:#FEE2E2;
  border:1px solid #FCA5A5;
  border-radius:10px;
  color:#991B1B;
  font-size:13px;
}

@media(max-width:768px){
  .mb{ padding:16px; }
  .mb-header{ padding:24px 22px; border-radius:20px; }
  .mb-title{ font-size:26px; }
  .mb-card-header{ flex-direction:column; align-items:flex-start; gap:10px; }
}
`;

function getStatusClass(status) {
  const s = (status || "PENDING").toUpperCase();
  if (s === "CONFIRMED" || s === "APPROVED") return "mb-status-confirmed";
  if (s === "CANCELLED") return "mb-status-cancelled";
  if (s === "REJECTED")  return "mb-status-rejected";
  return "mb-status-pending";
}

export default function MyBookings() {
  const navigate = useNavigate();
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  const [bookings,   setBookings]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true); setError(null);
      const res = await API.get(`/api/bookings/passenger/${user.name}`);
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      setCancelling(id);
      await API.delete(`/api/bookings/${id}`);
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to cancel booking.");
    } finally {
      setCancelling(null);
    }
  };
const payNow = async(booking)=>{

try{

const amount =

booking.ride.fare *

booking.seatsBooked;

const orderResponse =

await API.post(

`/api/payment/create-order/${amount}`

);

const order =
orderResponse.data;

const options = {

key:"rzp_test_SxtMnH80KJ2dyS",

amount:order.amount,

currency:"INR",

name:"Gram Parivahan",

description:"Ride Payment",

order_id:order.id,

handler: async function(response){

await API.put(

`/api/bookings/pay/${booking.id}`,

{

paymentId:
response.razorpay_payment_id

}

);

alert(

"Payment Successful"

);

fetchBookings();

},

prefill:{

name:booking.passengerName

},

theme:{

color:"#f97316"

}

};

const razor =

new window.Razorpay(

options

);

razor.open();

}catch(error){

console.log(error);

alert(

"Payment Failed"

);

}

};
  return (
    <div className="mb">
      <style>{css}</style>

      {/* ── HEADER — same compact height as SearchRide ── */}
      <div className="mb-header">
        <div className="mb-badge">Booking Management</div>
        <h1 className="mb-title">My Bookings</h1>
        <p className="mb-sub">View and manage your ride bookings</p>
      </div>

      <div className="mb-content">
        {loading ? (
          <div className="mb-loader">
            <div className="mb-spinner" />
            <div style={{ fontSize: 13, color: "#6b7280" }}>Loading…</div>
          </div>
        ) : error ? (
          <div className="mb-error">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="mb-empty">
            <div className="mb-empty-icon">🎫</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>No Bookings Yet</h3>
            <p style={{ color: "#6b7280" }}>Search and book a ride to get started.</p>
          </div>
        ) : (
          bookings.map((booking) => {
            const ride = booking.ride;
            const totalFare = (ride?.fare || 0) * (booking.seatsBooked || 1);
            const canCancel =

booking.status === "PENDING"

||

booking.status === "APPROVED";

            return (
              <div className="mb-card" key={booking.id}>
                <div className="mb-card-header">
                  <div className="mb-route">
                    {ride?.source || "—"}
                    <span style={{ color: "#9ca3af", margin: "0 6px" }}>→</span>
                    {ride?.destination || "—"}
                  </div>
                  <span className={`mb-status ${getStatusClass(booking.status)}`}>
                    {booking.status || "PENDING"}
                  </span>
                </div>

                <div className="mb-card-body">
                  <div className="mb-info">
                    <span className="mb-info-label">Driver</span>
                    <span className="mb-info-value">{ride?.driverName || "—"}</span>
                  </div>
                  <div className="mb-info">
                    <span className="mb-info-label">Date</span>
                    <span className="mb-info-value">{ride?.date || "—"}</span>
                  </div>
                  <div className="mb-info">
                    <span className="mb-info-label">Time</span>
                    <span className="mb-info-value">{ride?.time || "—"}</span>
                  </div>
                  <div className="mb-info">
                    <span className="mb-info-label">Seats Booked</span>
                    <span className="mb-info-value">{booking.seatsBooked}</span>
                  </div>
                </div>

                <div className="mb-fare-row">
                  <span style={{ fontWeight: 700 }}>Total Amount</span>
                  <span className="mb-fare-value">₹{totalFare}</span>
                </div>
              <p>

<strong>

Payment Method:

</strong>

{booking.paymentMethod}

</p>

<p>

<strong>

Payment Status:

</strong>

{booking.paymentStatus}

</p>
<p>

<strong>

Payment Status:

</strong>

{booking.paymentStatus}

</p>
{

booking.status==="COMPLETED"

&&

booking.paymentStatus!=="PAID"

&&

<div className="mt-3">

<button

className="btn btn-success"

style={{
padding:"10px 20px",
borderRadius:"10px"
}}

onClick={()=>payNow(booking)}

>

Pay Now

</button>

</div>

}
                {canCancel && (
                  <div className="mb-actions">
                    <button
                      className="mb-btn mb-btn-danger"
                      onClick={() => cancelBooking(booking.id)}
                      disabled={cancelling === booking.id}
                    >
                      {cancelling === booking.id ? "Cancelling…" : "Cancel"}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}