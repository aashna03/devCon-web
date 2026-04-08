import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // never call hook in a function
  
  const handleLogin = async() => {
    // Handle login logic here
    try 
      {const res = await axios.post(`${BASE_URL}/login`, {
          emailId: emailId,
          password: password
        },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data))
      return navigate("/"); // after hitting login, navigate to home page /
      } 
    catch (err) {
          setError(err?.response?.data || "Something went wrong.");
          console.error("Login failed:", err?.response?.data);
    }
  }

  const handleSignUp = async() => {
    try {
      const res = await axios.post(`${BASE_URL}/signup`, {
        firstName,
        lastName,
        emailId,
        password
      },
      { withCredentials: true }
      );
      dispatch(addUser(res.data))
      return navigate("/profile"); // after hitting login, navigate to profile page /
      
    } catch (err) {
      console.error("Sign Up failed:", err?.response?.data || err.message);
      setError(err?.response?.data || "Something went wrong.");
    }
  }

  return (
    <div className= "flex justify-center my-15">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginMode ? "Login":"SignUp"}
            </h2>
           <div>

            {!isLoginMode &&
            <>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text ">First Name</span>
              </div>
              <input type="text"
              value={firstName} 
              // placeholder=" " 
              className="input input-bordered w-full max-w-xs" 
              onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text ">Last Name</span>
              </div>
              <input type="text"
              value={lastName} 
              // placeholder=" " 
              className="input input-bordered w-full max-w-xs" 
              onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            </>
            }
    
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text ">Email Id</span>
              </div>
              <input type="text"
              value={emailId} 
              // placeholder=" " 
              className="input input-bordered w-full max-w-xs" 
              onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="password"
              value={password}  
              placeholder=" " 
              className="input input-bordered w-full max-w-xs" 
              onChange={(e) => setPassword(e.target.value)}
              />
            </label>

              <p className="text-sm text-blue-500 cursor-pointer" onClick={() => setIsLoginMode(!isLoginMode)}>
                {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </p>


          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginMode? handleLogin:handleSignUp}>
              {isLoginMode ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login