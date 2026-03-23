import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login first");
      window.location.href = "/login";
      return;
    }

    axios.get("http://127.0.0.1:8000/api/profile/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setUser(res.data))
    .catch(() => alert("Error"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
const uploadImage = (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", file);

  axios.post("http://127.0.0.1:8000/api/upload-profile/", formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => {
    alert("Uploaded!");
    window.location.reload();
  });
};
  return (
  <div className="container">
    <h2>👤 My Profile</h2>

    {user && (
      <div className="card">
        <img
          src={
            user.image
              ? "http://127.0.0.1:8000" + user.image
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%"
          }}
        />

        <h3>{user.username}</h3>
        <p>User ID: {user.id}</p>
      </div>
    )}

    <input type="file" onChange={(e) => uploadImage(e.target.files[0])} />

    <button onClick={logout}>Logout</button>
  </div>
);

}

export default Profile;