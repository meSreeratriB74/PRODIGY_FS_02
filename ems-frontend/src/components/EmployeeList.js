import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await api.delete(`/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEmployees();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const res = await api.get('/employees/download-excel', {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` }
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'employee_dataset.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Excel download error:', err);
      alert('Failed to download Excel');
    }
  };

  if (loading) return <p style={loadingStyle}>Loading employees...</p>;

  return (
    <div style={container}>
      <h2 style={title}>Employee Management System</h2>
      <div style={buttonContainer}>
        <button style={addButton} onClick={() => navigate('/add-employee')}>➕ Add Employee</button>
        <button style={downloadButton} onClick={handleDownloadExcel}>📥 Download Excel</button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>#</th>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Position</th>
            <th style={th}>Department</th>
            <th style={th}>Salary</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr><td colSpan={7} style={emptyRow}>No records found</td></tr>
          ) : (
            employees.map((emp, idx) => (
              <tr key={emp._id} style={row}>
                <td style={td}>{idx + 1}</td>
                <td style={td}>{emp.name}</td>
                <td style={td}>{emp.email}</td>
                <td style={td}>{emp.position || '-'}</td>
                <td style={td}>{emp.department || '-'}</td>
                <td style={td}>{emp.salary ?? '-'}</td>
                <td style={td}>
                  <button style={editButton} onClick={() => navigate(`/edit-employee/${emp._id}`)}>Edit</button>
                  <button style={deleteButton} onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ---------- Styles ----------
const container = { padding: 30, maxWidth: 1000, margin: '20px auto', background: '#f79feaff', borderRadius: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' };
const title = { textAlign: 'center', color: '#333', marginBottom: 20 };
const buttonContainer = { display: 'flex', justifyContent: 'flex-end', marginBottom: 15, gap: 10 };
const addButton = { padding: '8px 16px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' };
const downloadButton = { padding: '8px 16px', backgroundColor: '#2196f3', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' };
const table = { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 5px rgba(0,0,0,0.1)' };
const th = { textAlign: 'left', padding: '12px 10px', backgroundColor: '#f1f1f1', color: '#333', fontWeight: 600 };
const td = { padding: 10, borderBottom: '1px solid #9683f1ff' };
const row = { transition: 'background 0.2s', cursor: 'pointer', hover: { backgroundColor: '#f5f5f5' } };
const editButton = { padding: '5px 10px', backgroundColor: '#ff9800', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', marginRight: 5 };
const deleteButton = { padding: '5px 10px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' };
const emptyRow = { textAlign: 'center', padding: 15, color: '#777' };
const loadingStyle = { textAlign: 'center', marginTop: 50, color: '#555' };
