import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          withCredentials: true,
        });

        setUsers(res.data);
      } catch (error) {
        console.log("Error in fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li>
            {user.username} - {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
