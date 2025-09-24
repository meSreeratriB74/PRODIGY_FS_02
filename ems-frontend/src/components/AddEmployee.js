import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios instance with JWT interceptor

export default function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) return alert('Name and email are required');

    try {
      setLoading(true);

      // POST request with proper payload
      const payload = {
        name: form.name,
        email: form.email,
        position: form.position || null,
        department: form.department || null,
        salary: form.salary ? Number(form.salary) : null,
      };

      const res = await api.post('/employees', payload);

      alert('Employee added successfully!');
      navigate('/employees');
    } catch (err) {
      console.error('Add Employee Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Create failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>➕ Add Employee</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={fieldStyle}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label>Position</label>
          <input name="position" value={form.position} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label>Department</label>
          <input name="department" value={form.department} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label>Salary</label>
          <input name="salary" type="number" value={form.salary} onChange={handleChange} style={inputStyle} />
        </div>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

// --- Minimal CSS ---
const containerStyle = {
  padding: 20,
  maxWidth: 600,
  margin: '20px auto',
  border: '1px solid #eee',
  borderRadius: 8,
  background: '#fafafa',
};

const titleStyle = {
  marginBottom: 20,
  textAlign: 'center',
  color: '#333',
};

const formStyle = { width: '100%' };
const fieldStyle = { marginBottom: 12 };
const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '8px 10px',
  marginTop: 6,
  borderRadius: 4,
  border: '1px solid #ccc',
};
const buttonStyle = {
  padding: '10px 16px',
  background: '#4caf50',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
};
