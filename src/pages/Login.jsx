import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api"



const Login = () => {

const[data, setData] = useState({email:"",password : ""})
const navigate = useNavigate()

const handleLogin = async (e) => {
   e.preventDefault();
   try{
    const res = await API.post("/auth/login", data)
    
     localStorage.setItem("token", res.data.token);
     navigate("/dashboard")
   }catch(err){
     console.log(err.response.data)
   }
   };

return(
   <div className="h-screen flex items-center justify-center bg-gray-900">
      <form className="bg-gray-800 p-8 rounded-xl w-80 space-y-4" onSubmit={handleLogin}>
        <h2 className="text-white text-xl">Login</h2>

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

        <button className="w-full bg-blue-600 p-2 rounded">Login</button>

        <p className="text-gray-400 text-sm">
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
)



}


export default Login;