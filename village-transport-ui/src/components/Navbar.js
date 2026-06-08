import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import API from "../axiosConfig";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=Outfit:wght@400;600;700&display=swap');

  :root {
    --soil:          #7C4A1E;
    --wheat:         #F5DEB3;
    --wheat-dark:    #E8C98A;
    --cream:         #FFFBF0;
    --sunrise:       #EA580C;
    --sunrise-light: #FED7AA;
    --dark:          #1C1209;
    --muted:         #6B4C2A;
    --leaf:          #15803D;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-100%); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ripple {
    0%   { transform: scale(0); opacity: 0.5; }
    100% { transform: scale(2.8); opacity: 0; }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(234,88,12,0.4); }
    50%       { box-shadow: 0 0 0 6px rgba(234,88,12,0); }
  }
  @keyframes dropdownIn {
    from { opacity: 0; transform: translateY(8px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes menuSlide {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
.vt-nav{

position:sticky;

top:0;

left:0;

width:100%;

z-index:99999;

}

.vt-nav.top{

background:linear-gradient(
180deg,
rgba(8,15,35,.96) 0%,
rgba(10,20,45,.92) 45%,
rgba(12,25,55,.82) 100%
);

backdrop-filter:blur(8px);

border:none;

box-shadow:none;

}

.vt-nav.scrolled{

background:rgba(8,15,35,.96);

backdrop-filter:blur(12px);

box-shadow:
0 3px 20px rgba(0,0,0,.35);

}
 .vt-nav.top{

background:linear-gradient(
180deg,
rgba(8,15,35,.95) 0%,
rgba(8,15,35,.75) 50%,
rgba(8,15,35,0) 100%
);

backdrop-filter:blur(4px);

box-shadow:none;

border:none;

}
.vt-nav.scrolled{

background:rgba(8,15,35,.96);

backdrop-filter:blur(12px);

box-shadow:
0 3px 20px rgba(0,0,0,.35);

}
 .vt-nav.top{

background:linear-gradient(
180deg,
rgba(8,15,35,.96) 0%,
rgba(10,20,45,.92) 45%,
rgba(12,25,55,.82) 100%
);

backdrop-filter:blur(8px);

border:none;

box-shadow:none;

}

.vt-nav-inner{

max-width:1400px;

margin:auto;

height:78px;

padding:0 50px;

display:flex;

align-items:center;

justify-content:space-between;
position:relative;
z-index:10;

}

 .vt-brand{

display:flex;

align-items:center;

gap:12px;

text-decoration:none;

}

.vt-brand-main{

font-size:30px;

font-weight:700;

color:white;

line-height:1;

}

.vt-brand-sub{

font-size:14px;

color:#cbd5e1;

}


 .vt-brand-icon{

width:40px;

height:40px;

border-radius:12px;

background:linear-gradient(

135deg,

#f97316,

#ea580c

);

box-shadow:

0 4px 15px rgba(249,115,22,.4);

}


  .vt-links { display: flex; align-items: center; gap: 0.25rem; }

  .vt-link{

color:#d1d5db;

font-weight:600;

padding:.55rem 1rem;

border-radius:12px;

transition:.3s;

}

.vt-link:hover{

background:rgba(255,255,255,.08);

color:white;

}

.vt-link.active{

background:rgba(249,115,22,.15);

border:1px solid rgba(249,115,22,.25);

color:#FDBA74;

}
  .vt-link-dot {
    position: absolute; bottom: 5px; left: 50%;
    transform: translateX(-50%);
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--sunrise); opacity: 0; transition: opacity 0.2s;
  }
  .vt-link.active .vt-link-dot,
  .vt-link:hover  .vt-link-dot { opacity: 1; }

  .vt-ripple-circle {
    position: absolute; border-radius: 50%;
    background: rgba(245,222,179,0.22);
    width: 60px; height: 60px;
    margin-top: -30px; margin-left: -30px;
    animation: ripple 0.55s linear; pointer-events: none;
  }

  .vt-btn {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.5rem 1.1rem; font-size: 0.875rem; font-weight: 700;
    font-family: 'Outfit', sans-serif; border-radius: 8px;
    cursor: pointer; text-decoration: none; white-space: nowrap;
    min-height: 40px; border: 1.5px solid transparent;
    transition: transform 0.12s, background 0.15s;
    overflow: hidden; position: relative;
  }
  .vt-btn:active { transform: scale(0.96); }
  .vt-btn-primary{

background:linear-gradient(

135deg,

#f97316,

#ea580c

);

border:none;

padding:.7rem 1.4rem;

border-radius:12px;

box-shadow:

0 6px 20px rgba(249,115,22,.35);

}

.vt-btn-primary:hover{

transform:translateY(-1px);

}
  
  .vt-divider {
    width: 1px; height: 22px;
    background: rgba(245,222,179,0.15); margin: 0 0.25rem; flex-shrink: 0;
  }

  /* Profile trigger button */
  .vt-profile-btn {
    display: flex; align-items: center; gap: 0.55rem;
    background: rgba(245,222,179,0.07);
    border: 1px solid rgba(245,222,179,0.18);
    border-radius: 999px;
    padding: 0.22rem 0.75rem 0.22rem 0.22rem;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    position: relative;
  }
  .vt-profile-btn:hover {
    background: rgba(245,222,179,0.13);
    border-color: rgba(245,222,179,0.35);
  }
  .vt-profile-btn.open {
    background: rgba(245,222,179,0.13);
    border-color: rgba(234,88,12,0.5);
    box-shadow: 0 0 0 3px rgba(234,88,12,0.15);
  }

  /* Avatars */
  .vt-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--sunrise); color: #fff;
    font-size: 0.78rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; overflow: hidden;
    border: 2px solid rgba(234,88,12,0.4);
  }
  .vt-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

  .vt-avatar-lg {
    width: 52px; height: 52px; border-radius: 50%;
    background: var(--sunrise); color: #fff;
    font-size: 1.1rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; border: 2px solid rgba(234,88,12,0.5); flex-shrink: 0;
  }
  .vt-avatar-lg img { width: 100%; height: 100%; object-fit: cover; }

  .vt-pill-name { font-size: 0.82rem; color: var(--wheat-dark); font-weight: 600; }
  .vt-pill-caret { font-size: 0.6rem; color: #D6B896; transition: transform 0.2s; margin-left: 0.1rem; }
  .vt-profile-btn.open .vt-pill-caret { transform: rotate(180deg); }

  .vt-role-badge {
    font-size: 0.62rem; font-weight: 700;
    padding: 0.1rem 0.45rem; border-radius: 999px;
    text-transform: uppercase; letter-spacing: 0.06em;
  }
  .vt-role-passenger { background: rgba(59,130,246,0.18); color: #93C5FD; }
  .vt-role-driver    { background: rgba(21,128,61,0.18);  color: #86EFAC; }
  .vt-role-admin     { background: rgba(234,88,12,0.2);   color: #FDBA74; }

  /* Dropdown */
  .vt-dropdown-wrap { position: relative; }
  .vt-dropdown {
    position: absolute; top: calc(100% + 10px); right: 0;
    width: 240px; background: #23130A;
    border: 1px solid rgba(245,222,179,0.14);
    border-radius: 14px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.55);
    padding: 0.5rem;
    animation: dropdownIn 0.18s ease both; z-index: 300;
  }
  .vt-dropdown::before {
    content: ''; position: absolute; top: -6px; right: 22px;
    width: 12px; height: 12px; background: #23130A;
    border-left: 1px solid rgba(245,222,179,0.14);
    border-top: 1px solid rgba(245,222,179,0.14);
    transform: rotate(45deg); border-radius: 2px;
  }

  .vt-dd-header {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.75rem 0.75rem 0.85rem;
    border-bottom: 1px solid rgba(245,222,179,0.1);
    margin-bottom: 0.35rem;
  }
  .vt-dd-info { flex: 1; min-width: 0; }
  .vt-dd-name {
    font-size: 0.92rem; font-weight: 700; color: var(--wheat);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .vt-dd-role { margin-top: 0.2rem; }

  .vt-dd-item {
    display: flex; align-items: center; gap: 0.65rem;
    padding: 0.65rem 0.75rem; border-radius: 9px;
    font-size: 0.875rem; font-weight: 600;
    color: #D6B896; text-decoration: none;
    cursor: pointer; border: none;
    background: transparent; width: 100%;
    font-family: 'Outfit', sans-serif;
    transition: background 0.13s, color 0.13s; text-align: left;
  }
  .vt-dd-item:hover { background: rgba(245,222,179,0.08); color: var(--wheat); }
  .vt-dd-item.active { background: rgba(245,222,179,0.10); color: var(--wheat); }
  .vt-dd-item-icon {
    width: 28px; height: 28px; border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; flex-shrink: 0;
    background: rgba(245,222,179,0.07);
  }
  .vt-dd-item.danger { color: #FCA5A5; }
  .vt-dd-item.danger:hover { background: rgba(252,165,165,0.10); }
  .vt-dd-item.danger .vt-dd-item-icon { background: rgba(252,165,165,0.10); }
  .vt-dd-sep { height: 1px; background: rgba(245,222,179,0.1); margin: 0.3rem 0; }

  /* Hamburger */
  .vt-hamburger {
    display: none; flex-direction: column; justify-content: center;
    gap: 5px; width: 44px; height: 44px; border-radius: 8px;
    border: 1px solid rgba(245,222,179,0.2);
    background: transparent; cursor: pointer;
    align-items: center; padding: 0;
  }
  .vt-hamburger span {
    display: block; width: 20px; height: 2px;
    background: var(--wheat); border-radius: 2px;
    transition: transform 0.25s, opacity 0.25s; transform-origin: center;
  }
  .vt-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .vt-hamburger.open span:nth-child(2) { opacity: 0; }
  .vt-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Mobile drawer */
  .vt-drawer {
    display: none; flex-direction: column; gap: 0.3rem;
    padding: 0.85rem 1rem 1.1rem;
    background: #1C1209;
    border-top: 1px solid rgba(245,222,179,0.1);
    animation: menuSlide 0.2s ease both;
  }
  .vt-drawer.open { display: flex; }

  .vt-drawer-profile {
    display: flex; align-items: center; gap: 0.75rem;
    background: rgba(245,222,179,0.06);
    border: 1px solid rgba(245,222,179,0.12);
    border-radius: 12px; padding: 0.85rem 1rem; margin-bottom: 0.35rem;
  }
  .vt-drawer-info { flex: 1; min-width: 0; }
  .vt-drawer-name {
    font-size: 0.92rem; font-weight: 700; color: var(--wheat);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .vt-drawer-link {
    display: flex; align-items: center; gap: 0.65rem;
    padding: 0.72rem 0.85rem; border-radius: 10px;
    font-size: 0.92rem; font-weight: 600; color: #D6B896;
    text-decoration: none; border: 1px solid transparent;
    transition: background 0.13s, color 0.13s; min-height: 50px;
  }
  .vt-drawer-link:hover, .vt-drawer-link.active {
    background: rgba(245,222,179,0.08); color: var(--wheat);
    border-color: rgba(245,222,179,0.14);
  }
  .vt-drawer-icon {
    width: 30px; height: 30px; border-radius: 8px;
    background: rgba(245,222,179,0.07);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; flex-shrink: 0;
  }
  .vt-drawer-sep { height: 1px; background: rgba(245,222,179,0.1); margin: 0.3rem 0; }

  .vt-drawer-btn {
    display: flex; align-items: center; gap: 0.65rem;
    padding: 0.72rem 0.85rem; border-radius: 10px;
    font-size: 0.92rem; font-weight: 700; font-family: 'Outfit', sans-serif;
    cursor: pointer; border: none; min-height: 50px;
    text-decoration: none; transition: background 0.13s; width: 100%; text-align: left;
  }
  .vt-drawer-btn.primary { background: var(--sunrise); color: #fff; }
  .vt-drawer-btn.primary:hover { background: #C2410C; }
  .vt-drawer-btn.danger {
    background: rgba(252,165,165,0.08); color: #FCA5A5;
    border: 1px solid rgba(252,165,165,0.18);
  }
  .vt-drawer-btn.danger:hover { background: rgba(252,165,165,0.15); }

  @media (max-width: 768px) {
    .vt-links     { display: none; }
    .vt-hamburger { display: flex; }
  }
`;

function getInitials(name) {
  if (!name) return "U";
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

function addRipple(e) {
  const el = e.currentTarget;
  const c  = document.createElement("span");
  c.className = "vt-ripple-circle";
  const r = el.getBoundingClientRect();
  c.style.top  = (e.clientY - r.top)  + "px";
  c.style.left = (e.clientX - r.left) + "px";
  el.appendChild(c);
  setTimeout(() => c.remove(), 600);
}

function roleBadgeClass(role) {
  if (role === "DRIVER") return "vt-role-driver";
  if (role === "ADMIN")  return "vt-role-admin";
  return "vt-role-passenger";
}

function roleLabel(role) {
  if (role === "DRIVER") return "🚗 Driver";
  if (role === "ADMIN")  return "⚙️ Admin";
  return "🧍 Passenger";
}

// Avatar — shows photo if available, else initials
function Avatar({ photo, name, size = "sm" }) {
  const cls = size === "lg" ? "vt-avatar-lg" : "vt-avatar";
  return (
    <div className={cls}>
      {photo
        ? <img src={photo} alt={name || "user"} key={photo.slice(-16)} />
        : getInitials(name)
      }
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropRef  = useRef(null);

  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Read from localStorage — helper so we can call it anywhere
  const getStoredUser  = () => { try { return JSON.parse(localStorage.getItem("user")); } catch
   { return null; } };
  const getStoredPhoto = () => getStoredUser()?.profilePhoto || "";

  const [user,  setUser]  = useState(getStoredUser);
  const [photo, setPhoto] = useState(getStoredPhoto);

  // KEY FIX: sync photo from localStorage on focus + storage events
  // This picks up changes made in Profile.jsx immediately when
  // the user navigates back — no API call needed.
  useEffect(() => {
    const sync = () => {
      const u = getStoredUser();
      setUser(u);
      setPhoto(u?.profilePhoto || "");
    };
   window.addEventListener("storage", sync);

window.addEventListener("focus", sync);

window.addEventListener("userUpdated", sync);  // this tab regains focus
    return () => {
     window.removeEventListener("storage", sync);

window.removeEventListener("focus", sync);

window.removeEventListener("userUpdated", sync);

    };
  }, []);

  // Also sync on every route change (same-tab navigation)
  useEffect(() => {
    const u = getStoredUser();
    setUser(u);
    setPhoto(u?.profilePhoto || "");
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (path) => location.pathname === path;

 const logout = () => {

localStorage.clear();

setUser(null);

setPhoto("");

setDropdownOpen(false);

setMobileOpen(false);

navigate("/login");

};

  return (
    <>
      <style>{css}</style>

      <nav className={`vt-nav ${scrolled ? "scrolled" : "top"}`}>
        <div className="vt-nav-inner">

          {/* BRAND */}
          <Link to="/" className="vt-brand">
            
           
              <span className="vt-brand-main">Gram Parivahan</span>
              <span className="vt-brand-sub">Village Transport</span>
            
          </Link>

          {/* DESKTOP LINKS */}
          <div className="vt-links">

            <Link to="/" className={`vt-link ${isActive("/") ? "active" : ""}`} onClick={addRipple}>
              Home <span className="vt-link-dot" />
            </Link>

            {/* Logged out */}
            {!user && (
              <>
                <Link to="/register" className={`vt-link ${isActive("/register") ? "active" : ""}`} onClick={addRipple}>
                 Register <span className="vt-link-dot" />
                </Link>
                <span className="vt-divider" />
                <Link to="/login" className="vt-btn vt-btn-primary" onClick={addRipple}>
                 Login
                </Link>
              </>
            )}

            {/* Logged in */}
            {user && (
              <>
                <Link

to={
user?.role === "ADMIN"
? "/admin-dashboard"
: "/dashboard"
}

className={`vt-link ${
isActive("/dashboard") ||
isActive("/admin-dashboard")
? "active"
: ""
}`}

onClick={addRipple}
>

Dashboard

<span className="vt-link-dot" />

</Link>

                {user.role === "PASSENGER" && (
                  <Link to="/search" className={`vt-link ${isActive("/search") ? "active" : ""}`} onClick={addRipple}>
                     Search Ride <span className="vt-link-dot" />
                  </Link>
                )}

                {/* {user.role === "DRIVER" && (
                  <Link to="/add-ride" className={`vt-link ${isActive("/add-ride") ? "active" : ""}`} onClick={addRipple}>
                    ➕ Add Ride <span className="vt-link-dot" />
                  </Link>
                )} */}

                <span className="vt-divider" />

                {/* Profile dropdown */}
                <div className="vt-dropdown-wrap" ref={dropRef}>
                  <button
                    className={`vt-profile-btn ${dropdownOpen ? "open" : ""}`}
                    onClick={() => setDropdownOpen(o => !o)}
                    aria-label="Profile menu"
                  >
                    <Avatar photo={photo} name={user.name} size="sm" />
                   <div>

<div className="vt-pill-name">

{user.name}

</div>

<small style={{
color:"#cbd5e1",
fontSize:"11px"
}}>

{user.role}

</small>

</div>
                    <span className="vt-pill-caret">▼</span>
                  </button>

                  {dropdownOpen && (
                    <div className="vt-dropdown">
                      {/* Header */}
                      <div className="vt-dd-header">
                        <Avatar photo={photo} name={user.name} size="lg" />
                        <div className="vt-dd-info">
                          <div className="vt-dd-name">{user.name || "User"}</div>
                          <div className="vt-dd-role">
                            <span className={`vt-role-badge ${roleBadgeClass(user.role)}`}>
                              {roleLabel(user.role)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Link to="/profile" className={`vt-dd-item ${isActive("/profile") ? "active" : ""}`} onClick={() => setDropdownOpen(false)}>
                        <span className="vt-dd-item-icon">👤</span> My Profile
                      </Link>
                     <Link

to={
user?.role === "ADMIN"
? "/admin-dashboard"
: "/dashboard"
}

className={`vt-dd-item ${
isActive("/dashboard") ||
isActive("/admin-dashboard")
? "active"
: ""
}`}

onClick={() => setDropdownOpen(false)}

>

Dashboard

</Link>

                      {user.role === "PASSENGER" && (
                        <Link to="/my-bookings" className={`vt-dd-item ${isActive("/my-bookings") ? "active" : ""}`} onClick={() => setDropdownOpen(false)}>
                          <span className="vt-dd-item-icon"></span> My Bookings
                        </Link>
                      )}
                      {user.role === "DRIVER" && (
                        <Link to="/my-rides" className={`vt-dd-item ${isActive("/my-rides") ? "active" : ""}`} onClick={() => setDropdownOpen(false)}>
                          <span className="vt-dd-item-icon">🚗</span> My Rides
                        </Link>
                      )}
                      <Link to="/platform-review" className={`vt-dd-item ${isActive("/platform-review") ? "active" : ""}`} onClick={() => setDropdownOpen(false)}>

Platform Review

</Link>

                      <div className="vt-dd-sep" />
                      <button className="vt-dd-item danger" onClick={logout}>
                        <span className="vt-dd-item-icon"></span> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`vt-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`vt-drawer ${mobileOpen ? "open" : ""}`}>

          {user && (
            <div className="vt-drawer-profile">
              <Avatar photo={photo} name={user.name} size="lg" />
              <div className="vt-drawer-info">
                <div className="vt-drawer-name">{user.name || "User"}</div>
                <span className={`vt-role-badge ${roleBadgeClass(user.role)}`}>
                  {roleLabel(user.role)}
                </span>
              </div>
            </div>
          )}

          <Link to="/" className={`vt-drawer-link ${isActive("/") ? "active" : ""}`}>
            <span className="vt-drawer-icon"></span> Home
          </Link>

          {!user && (
            <>
              <Link to="/register" className={`vt-drawer-link ${isActive("/register") ? "active" : ""}`}>
                <span className="vt-drawer-icon"></span> Register
              </Link>
              <button className="vt-drawer-btn primary" onClick={() => navigate("/login")}>
                <span className="vt-drawer-icon"></span> Login
              </button>
            </>
          )}

          {user && (
            <>
              <Link to="/profile" className={`vt-drawer-link ${isActive("/profile") ? "active" : ""}`}>
                <span className="vt-drawer-icon">👤</span> My Profile
              </Link>
             <Link

to={
user?.role === "ADMIN"
? "/admin-dashboard"
: "/dashboard"
}

className={`vt-drawer-link ${
isActive("/dashboard") ||
isActive("/admin-dashboard")
? "active"
: ""
}`}

>

Dashboard

</Link>

              {user.role === "PASSENGER" && (
                <>
                  <Link to="/search" className={`vt-drawer-link ${isActive("/search") ? "active" : ""}`}>
                    <span className="vt-drawer-icon"></span> Search Ride
                  </Link>
                  <Link to="/my-bookings" className={`vt-drawer-link ${isActive("/my-bookings") ? "active" : ""}`}>
                    <span className="vt-drawer-icon"></span> My Bookings
                  </Link>
                  <Link
to="/platform-review"
>

Platform Review

</Link>
                </>
              )}
              {user.role === "DRIVER" && (
                <>
                  <Link to="/add-ride" className={`vt-drawer-link ${isActive("/add-ride") ? "active" : ""}`}>
                    <span className="vt-drawer-icon"></span> Add Ride
                  </Link>
                  <Link to="/my-rides" className={`vt-drawer-link ${isActive("/my-rides") ? "active" : ""}`}>
                    <span className="vt-drawer-icon"></span> My Rides
                  </Link>
                </>
              )}

              <div className="vt-drawer-sep" />
              <button className="vt-drawer-btn danger" onClick={logout}>
                <span className="vt-drawer-icon"></span> Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}