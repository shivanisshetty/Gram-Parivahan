import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../axiosConfig";

function Home() {
  const [rides, setRides] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => { loadReviews(); }, []);
  useEffect(() => { fetchRides(); }, []);

  const loadReviews = async () => {
    try {
      const response = await API.get("/api/platform-reviews");
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRides = async () => {
    try {
      const response = await API.get("/api/rides");
      setRides(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=Outfit:wght@400;600;700&display=swap');

        body { background: #f8fafc; margin: 0; font-family: 'Outfit', sans-serif; }

        /* ── HERO ── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          .hero{

padding-top:90px;

}
        }

        /* Animated sky */
        .hero-sky {
          position: absolute;
          inset: 0;
          animation: skyShift 10s ease-in-out infinite alternate;
        }
        @keyframes skyShift {
          0%   { background: linear-gradient(180deg, #0d1a2e 0%, #1a2e52 20%, #7c3a12 55%, #c2600a 75%, #e8901a 100%); }
          50%  { background: linear-gradient(180deg, #1a0a2e 0%, #3d1a5a 20%, #8c2a40 55%, #d45010 75%, #f0a020 100%); }
          100% { background: linear-gradient(180deg, #0d1a2e 0%, #152840 20%, #5a2a0a 55%, #a84010 75%, #e07010 100%); }
        }

        /* Sun */
        .hero-sun {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffe066 30%, #ffa020 70%, #ff6000 100%);
          right: 28%;
          top: 14%;
          animation: sunPulse 5s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes sunPulse {
          0%   { box-shadow: 0 0 50px rgba(255,160,30,0.4), 0 0 100px rgba(255,100,0,0.18); transform: scale(1); }
          100% { box-shadow: 0 0 90px rgba(255,180,50,0.65), 0 0 160px rgba(255,120,0,0.35); transform: scale(1.05); }
        }

        /* Stars */
        .hero-stars { position: absolute; top: 0; left: 0; width: 100%; height: 45%; pointer-events: none; }

        /* Birds */
        .hero-birds {
          position: absolute;
          top: 70px;
          left: 0;
          width: 200px;
          pointer-events: none;
          animation: birdsFly 20s linear infinite;
        }
        @keyframes birdsFly { from { transform: translateX(-220px); } to { transform: translateX(110vw); } }
        .bird {
          position: absolute;
          width: 18px;
          height: 6px;
          border-top: 2px solid rgba(20,8,0,0.65);
          border-radius: 50% 50% 0 0;
        }
        .bird::before {
          content: '';
          position: absolute;
          left: 9px;
          top: 0;
          width: 9px;
          height: 6px;
          border-top: 2px solid rgba(20,8,0,0.65);
          border-radius: 50% 50% 0 0;
        }

        /* Village SVG scene */
        .hero-village {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          pointer-events: none;
        }

        /* Animated window lights */
        @keyframes flicker { 0%,100%{opacity:.9} 50%{opacity:.3} }
        .win-a { animation: flicker 2.4s ease-in-out infinite; }
        .win-b { animation: flicker 3.2s ease-in-out infinite .7s; }
        .win-c { animation: flicker 1.9s ease-in-out infinite 1.3s; }
        .win-d { animation: flicker 2.8s ease-in-out infinite .4s; }

        /* Moving road dashes */
        @keyframes roadMove { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -80; } }
        .road-dash { animation: roadMove 1.3s linear infinite; }

        /* Bullock cart */
        @keyframes cartRoll { 0% { transform: translateX(-160px); } 100% { transform: translateX(105vw); } }
        .cart-anim { animation: cartRoll 14s linear infinite; }

        /* Chimney smoke */
        @keyframes smokeRise { 0%{opacity:.7;transform:translateY(0) scale(1);} 100%{opacity:0;transform:translateY(-28px) scale(2.2);} }
        .smoke1 { animation: smokeRise 2.8s ease-out infinite; }
        .smoke2 { animation: smokeRise 2.8s ease-out infinite 1.4s; }

        /* Star twinkle */
        @keyframes twinkle { 0%,100%{opacity:.5} 50%{opacity:1} }
        .twinkle { animation: twinkle 2.2s ease-in-out infinite; }

        /* Hero content */
        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 600px;
          padding: 0 2.5rem;
          padding-top: 2rem;
        }
        .hero-badge {
          display: inline-block;
          padding: 7px 18px;
          background: rgba(234,88,12,0.9);
          color: #fff;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 20px;
          letter-spacing: .04em;
        }
        .hero-title {
          font-size: clamp(38px, 5.5vw, 64px);
          font-weight: 700;
          line-height: 1.1;
          color: #fff;
          text-shadow: 0 2px 24px rgba(0,0,0,.55);
        }
        .hero-title span { color: #f5a623; }
        .hero-sub {
          font-size: 18px;
          color: rgba(255,255,255,.88);
          margin-top: 20px;
          line-height: 1.8;
          max-width: 520px;
        }
        .hero-buttons {
          margin-top: 32px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .hero-stats {
          display: flex;
          gap: 36px;
          margin-top: 42px;
        }
        .hero-stat h3 { font-weight: 700; font-size: 28px; color: #fff; margin: 0; }
        .hero-stat p  { font-size: 13px; color: rgba(255,255,255,.72); margin: 0; }

        /* Hero right card */
        .hero-card {
          position: absolute;
          right: 4%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(15,9,3,0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 32px 28px;
          border-radius: 22px;
          color: #F5DEB3;
          width: 260px;
          border: 1px solid rgba(245,222,179,0.2);
        }
        .hero-card h4 { font-size: 17px; font-weight: 700; color: #fff; margin: 0 0 16px; }
        .hero-card hr { border: none; border-top: 1px solid rgba(245,222,179,0.18); margin: 0 0 16px; }
        .hero-card-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #D6B896;
          margin-bottom: 12px;
        }
        .hero-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(234,88,12,.22);
          color: #EA580C;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }

        /* ── BUTTONS ── */
        .btn-primary-vt {
          display: inline-flex;
          align-items: center;
          padding: 12px 28px;
          background: #EA580C;
          color: #fff;
          border-radius: 10px;
          font-weight: 700;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background .15s, transform .12s;
        }
        .btn-primary-vt:hover { background: #c2410c; transform: translateY(-1px); color: #fff; }

        .btn-outline-vt {
          display: inline-flex;
          align-items: center;
          padding: 12px 28px;
          background: rgba(255,255,255,.12);
          color: #fff;
          border-radius: 10px;
          font-weight: 700;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,.4);
          cursor: pointer;
          transition: background .15s;
          backdrop-filter: blur(6px);
        }
        .btn-outline-vt:hover { background: rgba(255,255,255,.22); color: #fff; }

        /* ── SERVICES SECTION ── */
        .section { padding: 90px 0; }

        .service-card {
          background: white;
          padding: 32px;
          border-radius: 18px;
          height: 100%;
          box-shadow: 0 4px 24px rgba(0,0,0,.08);
          transition: transform .3s, box-shadow .3s;
          border: 1px solid #f0ebe3;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 36px rgba(0,0,0,.13);
        }
        .service-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(234,88,12,.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 16px;
        }
        .service-card h4 { font-weight: 700; color: #1C1209; margin-bottom: 10px; }
        .service-card p  { color: #6B4C2A; line-height: 1.7; margin: 0; }

        /* ── HOW IT WORKS ── */
        .steps-section { background: linear-gradient(135deg, #fdf6ee 0%, #fff8f0 100%); padding: 90px 0; }
        .step-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #EA580C, #c2410c);
          color: #fff;
          font-size: 22px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 4px 16px rgba(234,88,12,.35);
        }

        /* ── TRUST / VERIFY BOX ── */
        .verify-box {
          background: linear-gradient(135deg, #0f172a 0%, #1C1209 100%);
          color: white;
          padding: 70px 60px;
          border-radius: 28px;
          position: relative;
          overflow: hidden;
        }
        .verify-box::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(234,88,12,.12);
        }
        .verify-box::after {
          content: '';
          position: absolute;
          bottom: -40px; left: -40px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: rgba(234,88,12,.08);
        }

        /* ── REVIEWS ── */
        .reviews-wrap { padding: 80px 0; background: #f8fafc; }
        .review-card {
          background: white;
          padding: 28px;
          border-radius: 18px;
          height: 100%;
          box-shadow: 0 2px 16px rgba(0,0,0,.07);
          border: 1px solid #f0ebe3;
          transition: transform .3s;
        }
        .review-card:hover { transform: translateY(-4px); }

        /* ── FOOTER ── */
        .footer {
          background: #0f172a;
          padding: 50px;
          color: white;
          margin-top: 0;
        }
        .footer h4 { font-family: 'Tiro Devanagari Hindi', serif; font-size: 20px; margin-bottom: 8px; }
        .footer p  { color: rgba(255,255,255,.6); margin: 0; }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        {/* Animated sky */}
        <div className="hero-sky" />

        {/* Stars */}
        <svg className="hero-stars" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          {[
            [80,22,1.3,.3],[160,48,1,1],[260,16,1.5,.8],[400,35,1,0.1],
            [540,12,1.4,.6],[680,40,1.1,1.2],[820,20,1.3,.5],[960,50,1,.9],
            [1080,15,1.5,.4],[1150,38,1.2,1.6]
          ].map(([x,y,r,d],i) => (
            <circle key={i} className="twinkle" cx={x} cy={y} r={r} fill="white" style={{animationDelay:`${d}s`}}/>
          ))}
        </svg>

        {/* Sun */}
        <div className="hero-sun" aria-hidden="true" />

        {/* Birds */}
        <div className="hero-birds" aria-hidden="true">
          <div className="bird" style={{top:0,left:'0%'}}/>
          <div className="bird" style={{top:'14px',left:'15%'}}/>
          <div className="bird" style={{top:'6px',left:'28%'}}/>
        </div>

        {/* Village SVG scene */}
        <svg className="hero-village" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          {/* Far hills */}
          <ellipse cx="300" cy="290" rx="500" ry="130" fill="#2d4a1e" opacity="0.55"/>
          <ellipse cx="950" cy="300" rx="450" ry="120" fill="#1e3612" opacity="0.65"/>
          {/* Mid hill */}
          <ellipse cx="600" cy="310" rx="720" ry="100" fill="#3a5a24"/>
          {/* Ground */}
          <rect x="0" y="248" width="1200" height="52" fill="#4a6e2a"/>
          <rect x="0" y="268" width="1200" height="32" fill="#5a8030"/>

          {/* HUT 1 */}
          <rect x="40" y="188" width="70" height="72" fill="#8B6344" rx="2"/>
          <polygon points="38,188 75,155 112,188" fill="#A0522D"/>
          <rect x="61" y="210" width="22" height="35" fill="#5a3a1a" rx="2"/>
          <rect className="win-a" x="44" y="196" width="15" height="12" fill="#FFD700" rx="1"/>
          <rect x="82" y="160" width="7" height="20" fill="#8B6344"/>
          <ellipse className="smoke1" cx="86" cy="158" rx="6" ry="5" fill="rgba(200,180,160,.65)"/>
          <ellipse className="smoke2" cx="88" cy="152" rx="5" ry="4" fill="rgba(200,180,160,.45)"/>

          {/* HUT 2 */}
          <rect x="135" y="198" width="60" height="62" fill="#9B7355" rx="2"/>
          <polygon points="133,198 165,168 197,198" fill="#B8874A"/>
          <rect x="153" y="220" width="18" height="28" fill="#5a3a1a" rx="2"/>
          <rect className="win-b" x="139" y="206" width="13" height="11" fill="#FFD700" rx="1"/>
          <rect className="win-c" x="175" y="206" width="13" height="11" fill="#FFD700" rx="1"/>

          {/* TREE left */}
          <rect x="218" y="215" width="8" height="40" fill="#5C4A1E"/>
          <ellipse cx="222" cy="207" rx="26" ry="32" fill="#2d6e1e"/>
          <ellipse cx="222" cy="198" rx="18" ry="20" fill="#3a8024"/>

          {/* TEMPLE / Community hall */}
          <rect x="470" y="168" width="110" height="92" fill="#C4A882" rx="2"/>
          <polygon points="460,168 525,125 590,168" fill="#D2B48C"/>
          {/* Pillars */}
          <rect x="482" y="192" width="10" height="62" fill="#A0896a"/>
          <rect x="558" y="192" width="10" height="62" fill="#A0896a"/>
          {/* Door */}
          <rect x="506" y="215" width="38" height="45" fill="#6B4A2A" rx="3"/>
          {/* Temple flag */}
          <line x1="525" y1="125" x2="525" y2="106" stroke="#8B4513" strokeWidth="2"/>
          <polygon points="525,106 545,114 525,122" fill="#EA580C"/>
          {/* Windows */}
          <rect className="win-a" x="474" y="178" width="18" height="13" fill="#FFD700" rx="1"/>
          <rect className="win-b" x="556" y="178" width="18" height="13" fill="#FFD700" rx="1"/>

          {/* TREE mid-right */}
          <rect x="600" y="218" width="8" height="38" fill="#5C4A1E"/>
          <ellipse cx="604" cy="210" rx="24" ry="30" fill="#2d6e1e"/>
          <ellipse cx="604" cy="201" rx="16" ry="18" fill="#3a8024"/>

          {/* HUT 3 */}
          <rect x="730" y="194" width="65" height="66" fill="#8B6344" rx="2"/>
          <polygon points="728,194 762,162 796,194" fill="#A0522D"/>
          <rect x="750" y="216" width="20" height="32" fill="#5a3a1a" rx="2"/>
          <rect className="win-c" x="733" y="203" width="14" height="11" fill="#FFD700" rx="1"/>
          <rect x="776" y="167" width="7" height="18" fill="#8B6344"/>
          <ellipse className="smoke1" cx="780" cy="165" rx="6" ry="5" fill="rgba(200,180,160,.6)" style={{animationDelay:'.9s'}}/>

          {/* TALL TREE right */}
          <rect x="820" y="200" width="8" height="58" fill="#5C4A1E"/>
          <ellipse cx="824" cy="190" rx="22" ry="28" fill="#2d6e1e"/>
          <ellipse cx="824" cy="180" rx="15" ry="18" fill="#3a8024"/>

          {/* HUT 4 far right */}
          <rect x="940" y="196" width="62" height="64" fill="#9B7355" rx="2"/>
          <polygon points="938,196 971,165 1004,196" fill="#B8874A"/>
          <rect x="959" y="218" width="18" height="30" fill="#5a3a1a" rx="2"/>
          <rect className="win-d" x="943" y="205" width="13" height="11" fill="#FFD700" rx="1"/>
          <rect className="win-a" x="982" y="205" width="13" height="11" fill="#FFD700" rx="1"/>

          {/* TREE far right */}
          <rect x="1060" y="208" width="8" height="45" fill="#5C4A1E"/>
          <ellipse cx="1064" cy="200" rx="22" ry="27" fill="#2d6e1e"/>
          <ellipse cx="1064" cy="191" rx="14" ry="16" fill="#3a8024"/>

          {/* Wheat stalks */}
          {[1110,1120,1130,1140,1150].map((x,i) => (
            <g key={i}>
              <line x1={x} y1="262" x2={x} y2={246 - (i%2)*4} stroke="#C8A84B" strokeWidth="1.5"/>
              <ellipse cx={x} cy={244-(i%2)*4} rx="4" ry="3" fill="#C8A84B"/>
            </g>
          ))}

          {/* ROAD */}
          <rect x="0" y="262" width="1200" height="18" fill="#6B5C3A" rx="1"/>
          <line className="road-dash" x1="0" y1="271" x2="1200" y2="271"
            stroke="rgba(255,255,200,.45)" strokeWidth="2.5" strokeDasharray="40 25"/>

          {/* Bullock cart */}
          <g className="cart-anim">
            {/* Cart body */}
            <rect x="0" y="250" width="50" height="18" fill="#8B6344" rx="3"/>
            {/* Wheels */}
            <circle cx="10" cy="268" r="9" fill="none" stroke="#5C4A1E" strokeWidth="3"/>
            <circle cx="10" cy="268" r="2.5" fill="#5C4A1E"/>
            <circle cx="40" cy="268" r="9" fill="none" stroke="#5C4A1E" strokeWidth="3"/>
            <circle cx="40" cy="268" r="2.5" fill="#5C4A1E"/>
            {/* Yoke */}
            <line x1="50" y1="257" x2="72" y2="254" stroke="#5C4A1E" strokeWidth="2.5"/>
            {/* Bullock body */}
            <ellipse cx="83" cy="255" rx="18" ry="9" fill="#6B4A1E"/>
            {/* Head */}
            <ellipse cx="97" cy="248" rx="10" ry="7" fill="#6B4A1E"/>
            {/* Horns */}
            <line x1="100" y1="243" x2="108" y2="236" stroke="#5C4A1E" strokeWidth="2"/>
            <line x1="105" y1="244" x2="112" y2="237" stroke="#5C4A1E" strokeWidth="2"/>
            {/* Legs */}
            <line x1="70" y1="263" x2="68" y2="277" stroke="#6B4A1E" strokeWidth="2.5"/>
            <line x1="78" y1="263" x2="76" y2="277" stroke="#6B4A1E" strokeWidth="2.5"/>
            <line x1="88" y1="263" x2="86" y2="277" stroke="#6B4A1E" strokeWidth="2.5"/>
            <line x1="96" y1="263" x2="94" y2="277" stroke="#6B4A1E" strokeWidth="2.5"/>
          </g>

          {/* Foreground grass */}
          <rect x="0" y="278" width="1200" height="22" fill="#6b9030" opacity="0.7"/>
        </svg>

        {/* HERO CONTENT */}
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="hero-content">
                <div className="hero-badge">🌾 Trusted Village Transport Platform</div>
                <h1 className="hero-title">
                  Travel <span>Smarter</span><br />
                  Across Rural<br />
                  Communities
                </h1>
                <p className="hero-sub">
                  Book trusted rides, connect with verified drivers and make village transportation safer and easier for everyone.
                </p>
                <div className="hero-buttons">
                  <Link to="/register" className="btn-primary-vt">Get Started</Link>
                  <Link to="/search" className="btn-outline-vt">Find Rides</Link>
                </div>
                <div className="hero-stats">
                  <div className="hero-stat">
                    <h3>{rides.length}+</h3>
                    <p>Available Rides</p>
                  </div>
                  <div className="hero-stat">
                    <h3>Verified</h3>
                    <p>Driver Network</p>
                  </div>
                  <div className="hero-stat">
                    <h3>Secure</h3>
                    <p>Bookings</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-block">
              <div className="hero-card">
                <h4>Why Choose Us?</h4>
                <hr />
                {[
                  ['✓', 'Verified Drivers'],
                  ['✓', 'Easy Ride Booking'],
                  ['✓', 'Rural Connectivity'],
                  ['✓', 'Community Trusted Platform'],
                  ['✓', 'Secure Travel Experience'],
                ].map(([icon, label]) => (
                  <div className="hero-card-item" key={label}>
                    <span className="hero-check">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: '#1C1209' }}>Platform Services</h2>
            <p style={{ color: '#6B4C2A' }}>Built for reliable rural transportation</p>
          </div>
          <div className="row g-4">
            {[
              { icon: '🛡️', title: 'Verified Drivers', desc: 'Only admin-approved drivers can publish rides, ensuring safety for all passengers.' },
              { icon: '🚌', title: 'Ride Booking', desc: 'Passengers can discover and reserve rides quickly from their village.' },
              { icon: '🔒', title: 'Secure Management', desc: 'Manage bookings and ride approvals with end-to-end security.' },
            ].map(({ icon, title, desc }) => (
              <div className="col-md-4" key={title}>
                <div className="service-card">
                  <div className="service-icon">{icon}</div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="steps-section">
        <div className="container">
          <h2 className="text-center mb-5" style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: '#1C1209' }}>
            How Platform Works
          </h2>
          <div className="row text-center">
            {[
              { n: '1', title: 'Register', desc: 'Create a passenger or driver account in minutes.' },
              { n: '2', title: 'Verification', desc: 'Admin verifies driver credentials and documents.' },
              { n: '3', title: 'Publish Ride', desc: 'Verified drivers create and schedule rides.' },
              { n: '4', title: 'Travel', desc: 'Passengers find, book, and travel securely.' },
            ].map(({ n, title, desc }) => (
              <div className="col-md-3" key={n}>
                <div className="step-circle">{n}</div>
                <h5 style={{ color: '#1C1209', fontWeight: 700 }}>{title}</h5>
                <p style={{ color: '#6B4C2A' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="section">
        <div className="container">
          <div className="verify-box text-center">
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", position: 'relative', zIndex: 1 }}>
              Trusted Community Transport
            </h2>
            <p className="mt-3" style={{ color: 'rgba(255,255,255,.75)', position: 'relative', zIndex: 1, maxWidth: 540, margin: '16px auto 0' }}>
              Verified drivers, transparent ride management and secure booking experience for every village community.
            </p>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      {reviews.length > 0 && (
        <section className="reviews-wrap">
          <div className="container">
            <h2 className="text-center mb-5" style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: '#1C1209' }}>
              What Our Community Says
            </h2>
            <div className="row g-4">
              {reviews.map((review, index) => (
                <div className="col-lg-4" key={index}>
                  <div className="review-card">
                    <div className="d-flex align-items-center mb-3">
                      {review.profilePhoto ? (
                        <img
                          src={review.profilePhoto}
                          alt="profile"
                          style={{ width: 55, height: 55, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e5e7eb' }}
                        />
                      ) : (
                        <div style={{
                          width: 55, height: 55, borderRadius: '50%',
                          background: '#EA580C', color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: 18,
                        }}>
                          {review.userName?.charAt(0)}
                        </div>
                      )}
                      <div className="ms-3">
                        <h6 style={{ margin: 0, fontWeight: 700, color: '#1C1209' }}>{review.userName}</h6>
                        <small style={{ color: '#6B4C2A' }}>{review.role} • {review.location}</small>
                      </div>
                    </div>
                    <p style={{ color: '#f5a623', marginBottom: 8 }}>{'⭐'.repeat(review.rating)}</p>
                    <p style={{ color: '#4B3621', lineHeight: 1.7, marginBottom: 8 }}>{review.review}</p>
                    <small style={{ color: '#9a7a5a' }}>{review.reviewDate}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container text-center">
          <h4>Gram Parivahan</h4>
          <p>Reliable transport for connected rural communities</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;