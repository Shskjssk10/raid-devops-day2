import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3001'}/api/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load users')
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '12px', marginBottom: '8px' }}>
            <strong>{user.name}</strong>
            <br />
            <span style={{ color: '#666' }}>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
