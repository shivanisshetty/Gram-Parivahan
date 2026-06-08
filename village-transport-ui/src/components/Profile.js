
import React, { useEffect, useState } from "react";
import API from "../axiosConfig";

const css = `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root{

--bg:
linear-gradient(
180deg,
#eef4ff 0%,
#e7eefc 35%,
#f5f7fb 70%,
#ffffff 100%
);

--bg2:transparent;

--bg3:#f8fafc;

--text:#1f2937;

--text2:#6b7280;

--text3:#9ca3af;

--border:#e5e7eb;

--orange:#f97316;

--orangeDark:#ea580c;

--shadow:
0 12px 35px rgba(0,0,0,.12);

}

*,
*::before,
*::after{

box-sizing:border-box;

margin:0;

padding:0;

}

body{

background:transparent;

}

.p{

min-height:100vh;

font-family:'Inter',sans-serif;

background:var(--bg);

padding:30px;

color:var(--text);

}

.p-header{

background:
linear-gradient(
135deg,
#1b0d08,
#321408,
#5a2405
);

padding:50px;

border-radius:35px;

color:white;

margin-bottom:40px;

box-shadow:
0 25px 60px rgba(0,0,0,.25);

}

.p-title{

font-size:56px;

font-weight:800;

color:white;

margin-bottom:10px;

}

.p-sub{

font-size:18px;

color:#d1d5db;

}

.p-content{

max-width:1200px;

margin:auto;

}

.p-card{

background:
rgba(255,255,255,.96);

padding:40px;

border-radius:30px;

backdrop-filter:blur(10px);

box-shadow:
0 12px 35px rgba(0,0,0,.15);

border:none;

animation:fadeIn .3s ease both;

}

@keyframes fadeIn{

from{

opacity:0;

transform:translateY(8px);

}

to{

opacity:1;

transform:none;

}

}

@keyframes spin{

to{

transform:rotate(360deg);

}

}

.p-avatar-section{

display:flex;

gap:25px;

align-items:center;

padding-bottom:30px;

margin-bottom:30px;

border-bottom:1px solid var(--border);

}

.p-avatar{

width:120px;

height:120px;

border-radius:50%;

background:var(--orange);

display:flex;

align-items:center;

justify-content:center;

font-size:40px;

font-weight:700;

color:white;

overflow:hidden;

border:5px solid white;

box-shadow:
0 10px 25px rgba(0,0,0,.2);

flex-shrink:0;

}

.p-avatar img{

width:100%;

height:100%;

object-fit:cover;

}

.p-avatar-info h2{

font-size:28px;

font-weight:700;

margin-bottom:6px;

}

.p-avatar-info p{

color:var(--text2);

}

.p-grid{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(230px,1fr));

gap:20px;

}

.p-form-group{

margin-bottom:18px;

}

.p-label{

display:block;

font-size:12px;

font-weight:700;

margin-bottom:8px;

text-transform:uppercase;

color:var(--text3);

}

.p-input{

width:100%;

padding:14px;

border-radius:12px;

border:1px solid var(--border);

background:white;

font-size:14px;

transition:.2s;

}

.p-input:focus{

outline:none;

border-color:var(--orange);

box-shadow:
0 0 0 4px rgba(249,115,22,.15);

}

.p-input:disabled{

background:#f3f4f6;

}

.p-section{

margin-bottom:35px;

padding-bottom:30px;

border-bottom:1px solid var(--border);

}

.p-section-title{

font-size:18px;

font-weight:700;

margin-bottom:20px;

}

.p-actions{

display:flex;

gap:12px;

flex-wrap:wrap;

}

.p-btn{

padding:12px 20px;

border-radius:12px;

font-weight:600;

border:none;

cursor:pointer;

}

.p-btn-primary{

background:var(--orange);

color:white;

}

.p-btn-primary:hover{

background:var(--orangeDark);

}

.p-file-input{

display:none;

}

.p-file-label{

display:inline-flex;

padding:10px 16px;

margin-top:15px;

background:#fff7ed;

border-radius:12px;

cursor:pointer;

font-weight:600;

color:#9a3412;

}

.p-success{

padding:15px;

margin-bottom:20px;

border-radius:12px;

background:#dcfce7;

color:#166534;

}

.p-error{

padding:15px;

margin-bottom:20px;

border-radius:12px;

background:#fee2e2;

color:#b91c1c;

}

.p-loader{

text-align:center;

padding:120px;

}

.p-spinner{

width:40px;

height:40px;

border:4px solid #ddd;

border-top:4px solid var(--orange);

border-radius:50%;

margin:auto;

animation:spin .7s linear infinite;

}

@media(max-width:768px){

.p{

padding:20px;

}

.p-header{

padding:35px;

}

.p-title{

font-size:38px;

}

.p-avatar-section{

flex-direction:column;

text-align:center;

}

}

`;

function getInitials(name) {
  return !name ? "U" : name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

function compressImage(file, callback) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX = 300;
      const ratio = Math.min(MAX / img.width, MAX / img.height, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL("image/jpeg", 0.75));
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

export default function Profile() {
 const [user, setUser] = useState(
(() => {
try{

return JSON.parse(
localStorage.getItem("user")
);

}catch{

return null;

}
})()
);

useEffect(() => {

const refreshUser = () => {

setUser(

JSON.parse(
localStorage.getItem("user")
)

);

};

window.addEventListener(
"userUpdated",
refreshUser
);

return () => {

window.removeEventListener(
"userUpdated",
refreshUser
);

};

}, []);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState({ type: null, text: "" });

  useEffect(() => {
    if (!user) return;
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/api/users/profile/${user.name}`);
      const data = response.data;
      // Merge with localStorage photo fallback
      setProfile({
        ...data,
        profilePhoto: data.profilePhoto || user.profilePhoto || "",
      });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to load profile." });
    } finally {
      setLoading(false);
    }
  };

 const saveProfile = async () => {

try {

setSaving(true);

await API.put(

`/api/users/profile/${profile.id}`,

profile

);

const currentUser = JSON.parse(

localStorage.getItem("user")

);

const updatedUser = {

...currentUser,

name: profile.name,

role: profile.role,

phone: profile.phone,

profilePhoto: profile.profilePhoto

};

localStorage.setItem(

"user",

JSON.stringify(updatedUser)

);

window.dispatchEvent(

new Event(

"userUpdated"

)

);

setUser(updatedUser);

setMessage({

type:"success",

text:"Profile updated successfully!"

});

setEditing(false);

setTimeout(() => {

setMessage({

type:null,

text:""

});

},3000);

} catch(err){

console.log(err);

setMessage({

type:"error",

text:"Failed to update profile."

});

} finally {

setSaving(false);

}

};
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    compressImage(file, (compressed) => {
      setProfile({ ...profile, profilePhoto: compressed });
    });
  };

  const handleCancel = () => {
    fetchProfile();
    setEditing(false);
  };

  if (loading) return (
    <div className="p">
      <style>{css}</style>
      <div className="p-loader">
        <div className="p-spinner" />
        <div style={{ fontSize: "13px", color: "var(--text2)" }}>Loading…</div>
      </div>
    </div>
  );

  if (!profile) return null;

  const isDriver = user?.role === "DRIVER";

  return (
    <div className="p">
      <style>{css}</style>

      <div className="p-header">

<div
style={{
display:"inline-block",
padding:"10px 20px",
background:"rgba(249,115,22,.15)",
borderRadius:"30px",
marginBottom:"20px"
}}
>

Account Settings

</div>

<h1 className="p-title">

My Profile

</h1>

<p className="p-sub">

Manage personal and vehicle information

</p>

</div>

      <div className="p-content">
        {message.text && (
          <div className={`p-${message.type}`}>{message.text}</div>
        )}

        <div className="p-card">
          {/* Avatar & Basic Info */}
          <div className="p-avatar-section">
            <div className="p-avatar">
              {profile.profilePhoto
                ? <img src={profile.profilePhoto} alt={profile.name} key={profile.profilePhoto.slice(-12)} />
                : getInitials(profile.name)
              }
            </div>
            <div className="p-avatar-info">
              <h2>{profile.name}</h2>
              <p>{profile.role}</p>
              {editing && (
                <>
                  <label className="p-file-label" style={{ marginTop: "12px" }}>
                    Upload Photo
                    <input type="file" className="p-file-input" accept="image/*" onChange={handlePhotoChange} />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="p-section">
            <h3 className="p-section-title">Personal Information</h3>
            <div className="p-grid">
              <div className="p-form-group">
                <label className="p-label">Name</label>
                <input
                  type="text"
                  className="p-input"
                  disabled={!editing}
                  value={profile.name || ""}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="p-form-group">
                <label className="p-label">Phone</label>
                <input
                  type="text"
                  className="p-input"
                  disabled={!editing}
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="p-form-group">
                <label className="p-label">Role</label>
                <input type="text" className="p-input" disabled value={profile.role || ""} />
              </div>
            </div>
          </div>

          {/* Driver Information */}
          {isDriver && (
            <div className="p-section">
              <h3 className="p-section-title">Vehicle Information</h3>
              <div className="p-grid">
                <div className="p-form-group">
                  <label className="p-label">Vehicle Name</label>
                  <input
                    type="text"
                    className="p-input"
                    disabled={!editing}
                    value={profile.VehicleName || ""}
                    onChange={(e) => setProfile({ ...profile, VehicleName: e.target.value })}
                  />
                </div>
                <div className="p-form-group">
                  <label className="p-label">Vehicle Number</label>
                  <input
                    type="text"
                    className="p-input"
                    disabled={!editing}
                    value={profile.VehicleNumber || ""}
                    onChange={(e) => setProfile({ ...profile, VehicleNumber: e.target.value })}
                  />
                </div>
                <div className="p-form-group">
                  <label className="p-label">Driving License</label>
                  <input
                    type="text"
                    className="p-input"
                    disabled={!editing}
                    value={profile.DrivingLicense || ""}
                    onChange={(e) => setProfile({ ...profile, DrivingLicense: e.target.value })}
                  />
                </div>
                <div className="p-form-group">
                  <label className="p-label">Verification Status</label>
                  <input
                    type="text"
                    className="p-input"
                    disabled
                    value={profile.verified ? "Verified" : "Pending"}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="p-actions">
            {!editing ? (
              <button className="p-btn p-btn-primary" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <>
                <button className="p-btn p-btn-primary" onClick={saveProfile} disabled={saving}>
                  {saving ? "Saving…" : "Save Changes"}
                </button>
                <button className="p-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

