import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";
import MyBookings from "./pages/MyBookings";
import MyEvents from "./pages/MyEvents";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
function App() {
  return (
    <Router>
      {/* ✅ Navbar goes here */}
      <Navbar />

      {/* ✅ Routes go below Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;