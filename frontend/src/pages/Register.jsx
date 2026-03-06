import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import loginbg from "../assets/loginbg.jpeg";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      console.log(response.data);

      if (response.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        setError(error.response.data.error || "Error from server");
      } else if (error.request) {
        console.log("No response received:", error.request);
        setError("No response from server");
      } else {
        setError("Request error: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 px-4">
      <div
        className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full"
        style={{ width: "900px" }}
      >
        <div className="md:w-1/2 relative bg-gradient-to-br from-blue-800 to-blue-500">
          <img
            src={loginbg}
            alt="Register Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Register
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 mb-4 text-center">{success}</p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="name@email.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-gray-600 mb-2">
                Role
              </label>
              <select
                id="role"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
