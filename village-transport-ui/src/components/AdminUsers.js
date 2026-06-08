import React, { useEffect, useState } from "react";
import API from "../axiosConfig";

function AdminUsers() {

const [users, setUsers] = useState([]);

useEffect(() => {

fetchUsers();

}, []);

const fetchUsers = async () => {

try{

const response = await API.get(
"/api/admin/users"
);

setUsers(
response.data
);

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
color:"white",
boxShadow:
"0 20px 50px rgba(0,0,0,.25)"
},

userCard:{
background:"white",
borderRadius:"22px",
padding:"25px",
boxShadow:
"0 10px 30px rgba(0,0,0,.08)",
height:"100%"
},

badge:{
padding:"8px 16px",
borderRadius:"20px",
background:"#f97316",
color:"white",
fontWeight:"600",
fontSize:"14px"
}

};

return (

<div style={theme.page}>

<div className="container-fluid">

{/* HERO */}

<div style={theme.hero} className="mb-5">

<h1
style={{
fontSize:"45px",
fontWeight:"800"
}}
>

Manage Users

</h1>

<p
style={{
color:"#d1d5db",
fontSize:"18px"
}}
>

View and manage all registered users.

</p>

<span style={theme.badge}>

Total Users : {users.length}

</span>

</div>

{/* USER LIST */}

<div className="row g-4">

{

users.map((user)=>(

<div
className="col-md-4"
key={user.id}
>

<div style={theme.userCard}>

<h4
style={{
fontWeight:"700"
}}
>

{user.name}

</h4>

<p>

<strong>Role:</strong>

{user.role}

</p>

<p>

<strong>Phone:</strong>

{user.phone}

</p>

<p>

<strong>ID:</strong>

{user.id}

</p>

</div>

</div>

))

}

</div>

</div>

</div>

);

}

export default AdminUsers;