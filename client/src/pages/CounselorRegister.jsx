import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/authService"; // reuse your axios instance

const CounselorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "counselor",
    specializations: [],
    bio: "",
    availability: [
      { day: "Monday", startTime: "", endTime: "", isAvailable: false },
      { day: "Tuesday", startTime: "", endTime: "", isAvailable: false },
      { day: "Wednesday", startTime: "", endTime: "", isAvailable: false },
      { day: "Thursday", startTime: "", endTime: "", isAvailable: false },
      { day: "Friday", startTime: "", endTime: "", isAvailable: false },
    ],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Generic input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Specializations → comma-separated string → array
  const handleSpecializationsChange = (e) => {
    setFormData({
      ...formData,
      specializations: e.target.value.split(",").map((s) => s.trim()),
    });
  };

  // Availability updates
  const handleAvailabilityChange = (index, field, value) => {
    const updated = [...formData.availability];
    updated[index][field] = field === "isAvailable" ? e.target.checked : value;
    setFormData({ ...formData, availability: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/registerCounselor", formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Counselor registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500 px-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-[#a9a9a9] rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Counselor Registration
        </h2>

        {error && (
          <p className="text-center text-red-500 bg-red-100 p-3 rounded">
            {error}
          </p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          {/* Specializations */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Specializations (comma separated)
            </label>
            <input
              type="text"
              name="specializations"
              onChange={handleSpecializationsChange}
              placeholder="Anxiety, Depression"
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Weekly Availability
            </h3>
            {formData.availability.map((slot, idx) => (
              <div
                key={slot.day}
                className="flex items-center space-x-2 mb-2 bg-gray-100 p-2 rounded"
              >
                <label className="w-20">{slot.day}</label>
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    handleAvailabilityChange(idx, "startTime", e.target.value)
                  }
                  className="px-2 py-1 border rounded"
                />
                <span>-</span>
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    handleAvailabilityChange(idx, "endTime", e.target.value)
                  }
                  className="px-2 py-1 border rounded"
                />
                <label className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={slot.isAvailable}
                    onChange={(e) =>
                      handleAvailabilityChange(idx, "isAvailable", e)
                    }
                  />
                  <span>Available</span>
                </label>
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Registering..." : "Register as Counselor"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CounselorRegister;
