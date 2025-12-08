import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../DB/supabaseClient";

export default function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", password: "" });

  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editData, setEditData] = useState({
    display_name: "",
    password: "",
    passwordRepeat: "",
  });

  async function fetchUsers() {
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.error("No session found, user must log in");
      setLoading(false);
      return;
    }

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

    // hide admin
    const adminId = localStorage.getItem("userId");
    tempUsers = tempUsers.filter((u) => u.id !== adminId);

    setUsers(tempUsers);
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  async function confirmDelete() {
    if (!userToDelete) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_SUPABASE_URL}/functions/v1/delete-user`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ user_id: userToDelete.id }),
        }
      );

      if (!res.ok) {
        console.error("Failed to delete user:", await res.text());
        alert("Failed to delete user.");
        return;
      }

      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user.");
    }
  }

  //Create new user
  async function handleCreateUser(email, password) {
    if (!email || !password) {
      alert("Email and password are required.");
      return false;
    }

    try {
      // Sign up user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: "Ukendt" } },
      });

      if (error) {
        console.error("Error signing up:", error.message);
        alert("Error creating user: " + error.message);
        return false;
      }

      if (data && !error) {
        const userId = data.user.id;

        // Insert default settings
        await supabase.from("Settings").insert([
          { user_id: userId, visual_neglect: "Standard" },
          { user_id: userId, video_text: true },
        ]);

        alert("User created successfully!");
        // Refresh user list
        fetchUsers();
        return true;
      }
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Error creating user.");
      return false;
    }
  }

  // Edit user (email and password)
  async function handleEditUser(userId, { email, password }) {
    try {
      if (!email && !password) {
        alert("Nothing to update");
        return false;
      }

      const res = await fetch(
        `${process.env.REACT_APP_SUPABASE_URL}/functions/v1/update-user-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ user_id: userId, email, password }),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error("Failed to update user:", errText);
        alert("Failed to update user: " + errText);
        return false;
      }

      alert("User updated successfully!");
      fetchUsers(); // refresh the table
      return true;
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Error updating user.");
      return false;
    }
  }

  if (loading) return <p>Loading users...</p>;

  return (
    <>
      {/* MODAL */}
      {/* CREATE USER MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4">Create New User</h3>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                className="w-full border p-2 rounded"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Password</label>
              <input
                type="password"
                className="w-full border p-2 rounded"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block mb-1 font-semibold">
                Repeat Password
              </label>
              <input
                type="password"
                className="w-full border p-2 rounded"
                value={newUser.passwordRepeat || ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, passwordRepeat: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => {
                  setShowCreateModal(false);
                  setNewUser({ email: "", password: "", passwordRepeat: "" });
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={async () => {
                  const { email, password, passwordRepeat } = newUser;

                  if (!email || !password || !passwordRepeat) {
                    alert("Please fill in all fields");
                    return;
                  }

                  if (password !== passwordRepeat) {
                    alert("Passwords do not match");
                    return;
                  }

                  const success = await handleCreateUser(email, password);
                  if (success) {
                    setShowCreateModal(false);
                    setNewUser({ email: "", password: "", passwordRepeat: "" });
                  }
                }}
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {showEditModal && userToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>

            {/* Current Email */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Current Email</label>
              <p className="w-full border p-2 rounded bg-gray-100">
                {userToEdit.email}
              </p>
            </div>

            {/* New Email */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">New Email</label>
              <input
                type="email"
                className="w-full border p-2 rounded"
                value={editData.email}
                placeholder="Enter new email"
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">
                New Password (optional)
              </label>
              <input
                type="password"
                className="w-full border p-2 rounded"
                value={editData.password}
                placeholder="Enter new password"
                onChange={(e) =>
                  setEditData({ ...editData, password: e.target.value })
                }
              />
            </div>

            {/* Repeat New Password */}
            <div className="mb-6">
              <label className="block mb-1 font-semibold">
                Repeat New Password
              </label>
              <input
                type="password"
                className="w-full border p-2 rounded"
                value={editData.passwordRepeat}
                placeholder="Repeat new password"
                onChange={(e) =>
                  setEditData({ ...editData, passwordRepeat: e.target.value })
                }
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => {
                  setShowEditModal(false);
                  setUserToEdit(null);
                  setEditData({ email: "", password: "", passwordRepeat: "" });
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={async () => {
                  const { email, password, passwordRepeat } = editData;

                  // Check passwords match
                  if (password && password !== passwordRepeat) {
                    alert("Passwords do not match");
                    return;
                  }

                  // Call unified Edge Function
                  const success = await handleEditUser(userToEdit.id, {
                    email,
                    password,
                  });
                  if (success) {
                    setShowEditModal(false);
                    setUserToEdit(null);
                    setEditData({
                      email: "",
                      password: "",
                      passwordRepeat: "",
                    });
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>

            <p className="mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{userToDelete?.email}</span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAGE CONTENT */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>

        <h3 className="text-2xl font-bold mb-4">
          <span
            className="cursor-pointer inline text-blue-600 hover:underline"
            onClick={() => navigate("/forside")}
          >
            ← Back
          </span>
        </h3>

        <button
          className="mb-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => setShowCreateModal(true)}
        >
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
                      onClick={() => {
                        setUserToDelete(u);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>

                    <button
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => {
                        setUserToEdit(u);
                        setEditData({
                          email: u.email,
                          password: "",
                          passwordRepeat: "",
                        });
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
