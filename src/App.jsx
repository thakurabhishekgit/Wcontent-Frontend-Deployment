import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

// Set your backend URL here
const BASE_URL = "https://localhost:8082/api";

function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Load Booking System</h1>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/loads" style={{ margin: "10px" }}>
          View Loads
        </Link>
        <Link to="/create-load" style={{ margin: "10px" }}>
          Create Load
        </Link>
        <Link to="/bookings" style={{ margin: "10px" }}>
          View Bookings
        </Link>
        <Link to="/create-booking" style={{ margin: "10px" }}>
          Create Booking
        </Link>
      </nav>
    </div>
  );
}

function Loads() {
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/loads/getAllLoads`);
        setLoads(res.data);
      } catch (error) {
        console.error("Error fetching loads:", error);
      }
    };
    fetchLoads();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Loads</h2>
      {loads.map((load) => (
        <div
          key={load.id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <p>
            <strong>Load ID:</strong> {load.id}
          </p>
          <p>
            <strong>Shipper ID:</strong> {load.shipperId}
          </p>
          <p>
            <strong>Status:</strong> {load.status}
          </p>
        </div>
      ))}
    </div>
  );
}

function CreateLoad() {
  const [load, setLoad] = useState({
    shipperId: "",
    loadingPoint: "",
    unloadingPoint: "",
    loadingDate: "",
    unloadingDate: "",
    productType: "",
    truckType: "",
    noOfTrucks: 1,
    weight: 0,
    comment: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/loads/createLoad`, {
        ...load,
        datePosted: new Date().toISOString(),
      });
      alert("Load created successfully!");
      navigate("/loads");
    } catch (error) {
      console.error("Error creating load:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Load</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(load).map((key) => (
          <div key={key} style={{ margin: "10px 0" }}>
            <input
              type={
                key.includes("Date")
                  ? "datetime-local"
                  : typeof load[key] === "number"
                  ? "number"
                  : "text"
              }
              placeholder={key}
              value={load[key]}
              onChange={(e) => setLoad({ ...load, [key]: e.target.value })}
              required
            />
          </div>
        ))}
        <button type="submit">Create Load</button>
      </form>
    </div>
  );
}

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bookings/getAllBookings`);
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Bookings</h2>
      {bookings.map((booking) => (
        <div
          key={booking.id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <p>
            <strong>Booking ID:</strong> {booking.id}
          </p>
          <p>
            <strong>Transporter ID:</strong> {booking.transporterId}
          </p>
          <p>
            <strong>Status:</strong> {booking.status}
          </p>
        </div>
      ))}
    </div>
  );
}

function CreateBooking() {
  const [booking, setBooking] = useState({
    loadId: "",
    transporterId: "",
    proposedRate: 0,
    comment: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/bookings/createBooking`, {
        load: { id: booking.loadId },
        transporterId: booking.transporterId,
        proposedRate: parseFloat(booking.proposedRate),
        comment: booking.comment,
        requestedAt: new Date().toISOString(),
      });
      alert("Booking created successfully!");
      navigate("/bookings");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Booking</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Load ID"
          value={booking.loadId}
          onChange={(e) => setBooking({ ...booking, loadId: e.target.value })}
          required
          style={{ margin: "10px 0" }}
        />
        <input
          type="text"
          placeholder="Transporter ID"
          value={booking.transporterId}
          onChange={(e) =>
            setBooking({ ...booking, transporterId: e.target.value })
          }
          required
          style={{ margin: "10px 0" }}
        />
        <input
          type="number"
          placeholder="Proposed Rate"
          value={booking.proposedRate}
          onChange={(e) =>
            setBooking({ ...booking, proposedRate: e.target.value })
          }
          required
          style={{ margin: "10px 0" }}
        />
        <input
          type="text"
          placeholder="Comment"
          value={booking.comment}
          onChange={(e) => setBooking({ ...booking, comment: e.target.value })}
          style={{ margin: "10px 0" }}
        />
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loads" element={<Loads />} />
        <Route path="/create-load" element={<CreateLoad />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/create-booking" element={<CreateBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
