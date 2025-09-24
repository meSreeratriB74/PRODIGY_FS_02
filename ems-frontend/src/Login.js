import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // import useNavigate

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);

      alert('Login successful!');
      navigate('/dashboard'); // 👈 redirect to dashboard after alert

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '3rem auto',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.6rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        />

        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.6rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '1.2rem',
          }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
        >
          Login
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}

      <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>
          Register here
        </Link>
      </p>
    </div>
  );
}

export default Login;
