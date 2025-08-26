import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../DB/supabaseClient";

export default function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    setLoading(true);
    // 1. Get current session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.error("No session found, user must log in");
      setLoading(false);
      return;
    }

    console.log("Session:", session.access_token);

    // 2. Call the edge function with Authorization header
    const res = await fetch(
      `${process.env.REACT_APP_SUPABASE_URL}/functions/v1/get-users`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!res.ok) {
      console.error("Error fetching users", await res.text());
      setLoading(false);
      return;
    }

    const data = await res.json();
    let tempUsers = data.users.users || [];

    //hide admin user from list
    const adminId = localStorage.getItem("userId");
    const filteredUsers = tempUsers.filter((user) => user.id !== adminId);
    tempUsers = filteredUsers;

    setUsers(tempUsers || []); // edge function should return { users: [...] }
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <h3
        className="text-2xl font-bold mb-4 cursor-pointer bg- text-blue-600 hover:underline"
        onClick={() => navigate("/forside")}
      >
        ← Back
      </h3>
      <button className="mb-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        + Create User
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr
                key={u.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={async () => {
                      if (
                        !window.confirm(
                          `Are you sure you want to delete ${u.email}?`
                        )
                      )
                        return;

                      try {
                        const res = await fetch(
                          `${process.env.REACT_APP_SUPABASE_URL}/functions/v1/delete-user`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                            body: JSON.stringify({ user_id: u.id }),
                          }
                        );

                        if (!res.ok) {
                          const errText = await res.text();
                          console.error("Failed to delete user:", errText);
                          alert("Failed to delete user.");
                          return;
                        }

                        // Optionally parse response if needed
                        // const data = await res.json();

                        // Remove deleted user from state
                        setUsers((prev) =>
                          prev.filter((user) => user.id !== u.id)
                        );
                        alert("User deleted successfully!");
                      } catch (err) {
                        console.error("Error deleting user:", err);
                        alert("Error deleting user.");
                      }
                    }}
                  >
                    Delete
                  </button>
                  <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
