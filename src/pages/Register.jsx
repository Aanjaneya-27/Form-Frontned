import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api"



function Register () {
    const[data, setData] = useState({name:"",email:"",password : ""})
    const navigate = useNavigate()
      
    const handleRegister = async (e) => {
       e.preventDefault();
   await API.post("/auth/register", data)
   navigate("/")

}
return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <form className="bg-gray-800 p-8 rounded-xl w-80 space-y-4" onSubmit={handleRegister}>
        <h2 className="text-white text-xl">Register</h2>

        <input
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="w-full bg-green-600 p-2 rounded">Register</button>

        <p className="text-gray-400 text-sm">
          Already have account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
)

}

export default Register;