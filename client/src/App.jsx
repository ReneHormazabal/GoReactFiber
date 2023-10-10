import { useEffect, useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  async function fetchData() {
    const response = await fetch('http://localhost:3000/users')
    const data = await response.json()
    setUsers(data.users)
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/users',{
      method: 'POST',
      body: JSON.stringify({name}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    console.log(data)
    fetchData()
  };

  return (
    <>
      <form onSubmit={handleSubmit}>

        <input 
          type="name" 
          placeholder="Coloca tu nombre" 
          onChange={e => {setName(e.target.value)}}
        />

        <button>Guardar</button>

      </form>

      <ul>
        {users.map((user, index) => {
          return <li key={index}>{user.name}</li>
        })}
      </ul>
    </>
  )
}

export default App