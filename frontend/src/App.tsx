import { useState, useEffect } from 'react'

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [companies, setCompanies] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3001'}/api/users`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3001'}/api/companies`).then(res => res.json())
    ])
      .then(([usersData, companiesData]) => {
        setUsers(usersData)
        setCompanies(companiesData)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load data')
        setLoading(false)
      })
  }, [])

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  }

  const thStyle: React.CSSProperties = {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold'
  }

  const tdStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '12px'
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '12px', marginBottom: '8px' }}>
            <div>
              <strong>First Name:</strong> {user.first_name}
            </div>
            <div>
              <strong>Last Name:</strong> {user.last_name}
            </div>
            <div>
              <strong>Email:</strong> <span style={{ color: '#666' }}>{user.email}</span>
            </div>
          </li>
        ))}
      </ul>

      <h2>Companies</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Company Domain</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(domain => (
            <tr key={domain}>
              <td style={tdStyle}>{domain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
