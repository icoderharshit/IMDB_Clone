import React,{useState} from "react";
// import { LockClosedIcon } from '@heroicons/react/solid'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
const Login = ({ setLoginUser}) => {
// const navigate = useNavigate()
    const [user,setUser] = useState({
        email:"",
        password: ""
    })
    const handleChange = e =>{
    
    const {name,value} = e.target
    setUser({
    ...user,//spread operator 
    [name]:value
    })
    }
    
    const login=async ()=>{
    
      if(!user.email || !user.password ){
        alert("Fill the details properly.");
         return;
       }
       try {
        const response = await axios.post('https://trip2movies-backend.herokuapp.com/signin', user);
        console.log(response);
        localStorage.setItem("loggedIn","true");
        localStorage.setItem("userId",response.data.user._id);
        localStorage.setItem("userName",response.data.user.name);
        window.location.assign("/");
        // navigate("/");
      
      } catch (err) {
        alert(err.response.data.message);
      }
    }

    return (<>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Signin_font_awesome.svg/1200px-Signin_font_awesome.svg.png"
              alt="Signin"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete="email"
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
                  type="password"
                  value={user.password}
                  onChange={handleChange}
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
                  type="checkbox"
                  className="h-4 w-4 text-indigo-900 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-900 hover:text-indigo-500" style={{"pointerEvents":"none"}}>
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit" onClick={login}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span> */}
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
)
  }
export default Login;