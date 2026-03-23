import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return; // ✅ STOP if not logged in

  axios.get("http://127.0.0.1:8000/api/profile/", {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => setProfile(res.data))
  .catch(() => setProfile(null));
}, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="navbar">

      {/* LEFT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={
            profile?.image
              ? "http://127.0.0.1:8000" + profile.image
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            cursor: "pointer"
          }}
          onClick={() => token && (window.location.href = "/profile")}
        />

        <div style={{
  fontSize: "20px",
  fontWeight: "bold",
  background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}}>
  🎟 EventHub
</div>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>

        {token ? (
          <>
            <Link to="/create">Create</Link>
            <Link to="/my-events">My Events</Link>
            <Link to="/my-bookings">My Bookings</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </div>

    </div>
  );
}

export default Navbar;