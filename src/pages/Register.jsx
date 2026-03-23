import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios.post("http://127.0.0.1:8000/api/register/", {
      username,
      password
    })
    .then(() => {
      alert("User created! Now login");
      window.location.href = "/login";
    })
    .catch(err => {
  const message = err.response?.data?.error || "Something went wrong";
  alert(message);
});
  };

  return (
    <div className="container">
      <h2>📝 Sign Up</h2>

      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;