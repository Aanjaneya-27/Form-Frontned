// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/");
//     }
//   }, []);

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
//       <h1>Welcome Dashboard 🚀</h1>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // GET
  const fetchForms = async () => {
    const res = await API.get("/forms");
    setForms(res.data.data); // ✅ important
  };

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      const res = await API.get("/forms");
      if (isMounted) setForms(res.data.data);
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/forms", formData);

    setFormData({ name: "", email: "", password: "" });
    fetchForms();
  };

  // DELETE
  const handleDelete = async (id) => {
    await API.delete(`/forms/${id}`);
    fetchForms();
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input placeholder="Name"
          value={formData.name}
          onChange={(e)=>setFormData({...formData,name:e.target.value})}
          className="w-full p-2 bg-gray-800 rounded" />

        <input placeholder="Email"
          value={formData.email}
          onChange={(e)=>setFormData({...formData,email:e.target.value})}
          className="w-full p-2 bg-gray-800 rounded" />

        <input placeholder="Password"
          value={formData.password}
          onChange={(e)=>setFormData({...formData,password:e.target.value})}
          className="w-full p-2 bg-gray-800 rounded" />

        <button className="bg-green-600 px-4 py-2 rounded">
          Add
        </button>
      </form>

      {forms.map((f) => (
        <div key={f._id} className="bg-gray-800 p-3 mb-2 flex justify-between">
          <div>
            <h2>{f.name}</h2>
            <p>{f.email}</p>
          </div>

          <button
            onClick={() => handleDelete(f._id)}
            className="bg-red-500 px-3 rounded"
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}