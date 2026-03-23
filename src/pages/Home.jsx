import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container" style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🎟 Smart Event Booking</h1>
      <p>Book your favorite events instantly</p>

      <Link to="/events">
        <button>Explore Events</button>
      </Link>
    </div>
  );
}

export default Home;