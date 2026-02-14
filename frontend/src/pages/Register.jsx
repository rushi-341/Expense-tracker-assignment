import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("/auth/register", form);

    // After successful register → go to login
    navigate("/login");

  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
