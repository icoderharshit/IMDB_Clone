import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const Navigate=useNavigate();
    const [user,setUser] = useState({
        name:"",
        email:"",
        password: ""
    })
   const handleChange=e=>{
     const {name,value}=e.target;
    setUser({
      ...user,
      [name]:value
    })

    }
   const signup=async ()=>{
     if(!user.name || !user.email || !user.password ){
       alert("Fill the details properly.");
        return;
      }
     try{
        const response=await axios.post("https://trip2movies-backend.herokuapp.com/register",user);
        console.log(response);
        Navigate("/login");
     }
    
     catch(err){
      console.log(err)
     }
   }
   const [passwordShown,showPassword]=useState(false);
   const togglePassword=()=>{
     showPassword(!passwordShown);
   } 
   return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="http://cdn.onlinewebfonts.com/svg/img_337531.png"
              alt="Signup"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="Full-Name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="full-name"
                  name="name"
                  value={user.name}
                  onChange={ handleChange }
                  type="text"
                  autoComplete="off"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  value={user.email}
                  onChange={ handleChange }
                  type="email"
                  autoComplete="off"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={ handleChange }
                  type={passwordShown?"text":"password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox" onChange={togglePassword}
                  className="h-4 w-4 text-indigo-900 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Show password
                </label>
              </div>

              <div className="text-sm">
                <a href="./login" className="font-medium text-indigo-900 hover:text-indigo-500">
                  Already have an account ?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={signup}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
    
}
      
export default Register;