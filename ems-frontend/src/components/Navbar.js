import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "14px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(90deg, #007BFF, #6C63FF)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Brand */}
      <Link
        to="/dashboard"
        style={{
          fontWeight: "bold",
          fontSize: "1.3rem",
          color: "#fff",
          textDecoration: "none",
          letterSpacing: "1px",
        }}
      >
        Employee Management System
      </Link>

      {/* Links */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link
          to="/employees"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: 500,
            padding: "8px 14px",
            borderRadius: "8px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          👥 Employees
        </Link>

        <Link
          to="/add-employee"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: 500,
            padding: "8px 14px",
            borderRadius: "8px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          ➕ Add Employee
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e63939")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff4d4d")}
        >
          🔒 Logout
        </button>
      </div>
    </nav>
  );
}
