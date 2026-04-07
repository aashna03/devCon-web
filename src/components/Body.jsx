import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
import { BASE_URL } from "../utils/constants"
import { useLocation, useNavigate } from "react-router-dom"


const Body = () => {
  const dispatch = useDispatch(); // to dispatch actions to the redux store, we will use this in the login page to set user data in the store after successful login and also in the profile page to update user data in the store after editing profile
  const navigate = useNavigate(); // to navigate to login page if user is not logged in and tries to access profile page, we will check for user data in the store, if it's null then we will navigate to login page
  const location = useLocation();
  const userData = useSelector((store) => store.user); // to get user data from the store, we will use this in the profile page to display user data and also in the navbar to display user name and photo
  
  const fetchUser = async() => {
    if(userData) return; // if user data is already present in the store, then no need to fetch user data from the server, so return from here
    try {
      // hat line is needed to ask the backend: "Is this browser still authenticated? If yes, give me current user profile."
        const res = await axios.get(`${BASE_URL}/profile/view`, 
        { withCredentials: true });
        dispatch(addUser(res.data));
    } catch (error) {
        if(error.status === 401){
          navigate("/login");// if error occurs while fetching user data, then navigate to login page 
        } 
        console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (location.pathname === "/login") return;
    // if(!userData){ // if user data is not present in the store, then fetch user data from the server and set it in the store, so that we can use it in the profile page and other places
      fetchUser();
    // }

  }, [location.pathname]) // to fetch user data on page load and set it in the store, so that we can use it in the profile page and other places


  return (
    <div>
        <NavBar/>
        <Outlet /> {/* Everything inside Body will be rendered here - login, profile, etc. */}
        <Footer />
    
    </div>
  )
}

export default Body