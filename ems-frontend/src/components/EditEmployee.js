import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api"; // <-- axios instance

export default function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(true);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    await api.put(`/employees/${id}`, {
        name: form.name,
        email: form.email,
        position: form.position,
        department: form.department,
        salary: form.salary ? Number(form.salary) : undefined,
      });
      alert("✅ Employee updated successfully!");
      navigate("/employees");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
        alert("⚠️ Failed to load employee data");
      } finally {
        setLoadingFetch(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loadingFetch)
    return (
      <div style={{ padding: 30, textAlign: "center", fontSize: "1.2rem" }}>
        ⏳ Loading employee details...
      </div>
    );

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>✏️ Edit Employee</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Name */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Email */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Position */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Position</label>
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Department */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Department</label>
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Salary */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Salary</label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Buttons */}
        <div style={buttonGroupStyle}>
          <button type="button" onClick={() => navigate("/employees")} style={cancelButtonStyle}>
            ❌ Cancel
          </button>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Updating..." : "💾 Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Professional CSS styles ---
const containerStyle = {
  padding: "30px",
  maxWidth: "650px",
  margin: "40px auto",
  border: "1px solid #e0e0e0",
  borderRadius: "12px",
  background: "#ffffff",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  fontFamily: "Segoe UI, sans-serif",
};

const titleStyle = {
  marginBottom: "25px",
  textAlign: "center",
  fontSize: "1.8rem",
  color: "#333",
  fontWeight: "600",
};

const formStyle = { width: "100%" };

const fieldStyle = { marginBottom: "18px" };

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "600",
  color: "#555",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  transition: "border-color 0.3s",
};

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const buttonStyle = {
  padding: "10px 18px",
  background: "linear-gradient(90deg, #007BFF, #0056b3)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const cancelButtonStyle = {
  padding: "10px 18px",
  background: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
};
