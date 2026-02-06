import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
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

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axios.delete(`http://localhost:5000/api/users/delete/${id}`, {
      withCredentials: true,
    });

    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center flex-col gap-14">
      <div className="flex gap-3">
        <a href="/register">
          <button
            type="button"
            class="text-white bg-green-500 box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Register
          </button>
        </a>
        <a href="/login">
          <button
            type="button"
            class="text-white bg-green-500 box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Login
          </button>
        </a>
      </div>
      <p className="text-3xl">Welcome to the Home Page</p>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="flex gap-5">
            {user.email} - {user.username}
            <button
              className="bg-black"
              onClick={(e) => handleDelete(e, user._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* <Register /> */}
    </div>
  );
}

export default Home;
