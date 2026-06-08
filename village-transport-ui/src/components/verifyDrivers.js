import React, {
useEffect,
useState
} from "react";

import API from "../axiosConfig";

function VerifyDrivers() {

const [drivers, setDrivers] = useState([]);

useEffect(() => {

fetchDrivers();

}, []);

const fetchDrivers = async () => {

try {

const response = await API.get(
"/api/admin/users"
);

setDrivers(

response.data.filter(

u =>

u.role === "DRIVER"

&&

!u.verified

)

);

} catch(error){

console.log(error);

}

};

const verify = async(id) => {

try{

await API.put(

`/api/users/verify-driver/${id}`

);

alert(
"Driver Verified Successfully"
);

fetchDrivers();

}catch(error){

console.log(error);

}

};

const theme = {

page:{
minHeight:"100vh",
background:
"linear-gradient(180deg,#08152f 0%, #14284f 25%, #f6f7fb 25%)",
padding:"30px"
},

hero:{
background:
"linear-gradient(135deg,#1b0d08,#2b1609,#4b2207)",
padding:"45px",
borderRadius:"28px",
color:"white"
},

card:{
background:"white",
borderRadius:"22px",
padding:"25px",
boxShadow:
"0 10px 30px rgba(0,0,0,.08)"
},

profile:{
width:"90px",
height:"90px",
borderRadius:"50%",
objectFit:"cover",
border:"4px solid #f97316"
}

};

return(

<div style={theme.page}>

<div className="container-fluid">

<div style={theme.hero} className="mb-5">

<h1>

Driver Verification

</h1>

<p>

Verify driver documents and details

</p>

</div>

<div className="row g-4">

{

drivers.map(driver => (

<div
className="col-md-6"
key={driver.id}
>

<div style={theme.card}>

<div className="text-center mb-4">

{

driver.profilePhoto ?

<img
src={driver.profilePhoto}
alt=""
style={theme.profile}
/>

:

<div
style={{
...theme.profile,
background:"#f97316",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"35px",
color:"white"
}}
>

{driver.name?.charAt(0)}

</div>

}

</div>

<h4>

{driver.name}

</h4>

<hr/>

<p>

<strong>Phone:</strong>

{driver.phone}

</p>



<p>

<strong>Vehicle Name:</strong>

{driver.VehicleName}

</p>

<p>

<strong>Vehicle Number:</strong>

{driver.VehicleNumber}

</p>

<p>

<strong>Driving License:</strong>

{driver.DrivingLicense}

</p>


<p>

<strong>Status:</strong>

{driver.verified ? "Verified" : "Pending"}

</p>

<button

className="btn btn-success w-100"

onClick={() => verify(driver.id)}

>

Verify Driver

</button>

</div>

</div>

))

}

</div>

</div>

</div>

);

}

export default VerifyDrivers;