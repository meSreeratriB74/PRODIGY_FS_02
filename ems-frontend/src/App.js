import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import EmployeeList from './components/EmployeeList';
import Navbar from './components/Navbar';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';

// import your existing Login and Register pages
import Login from './Login';
import Register from './Register';

function Layout() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // hide navbar on login & register pages
  const hideNavbar =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && token && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-employee/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
