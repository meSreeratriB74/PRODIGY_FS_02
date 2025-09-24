
export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fff700ff, #fc0000ff)", // gradient background
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2.5rem",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          maxWidth: "650px",
          width: "100%",
          textAlign: "center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.2)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
        }}
      >
        <h1
          style={{
            color: "#333",
            marginBottom: "1rem",
            fontSize: "2.2rem",
            fontWeight: "bold",
          }}
        >
          Welcome to <span style={{ color: "#007BFF" }}>Employee Management System</span> Dashboard
        </h1>
        <p style={{ color: "#555", fontSize: "1.1rem", lineHeight: "1.6" }}>
          Use the navigation bar to view, add, and manage employees seamlessly.  
          Stay productive and organized with your professional dashboard.
        </p>
      </div>
    </div>
  );
}
