import { use } from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";



const ChangePassword = () => {
  const user = useSelector((store) => store.user);
  const [newPassword, setNewPassword] = useState("");
  const [reenteredPassword, setReEnterPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    if (!user) return;
  }, [user]);

  const saveProfile = async() => {
    try {
      const res = await axios.patch(
          `${BASE_URL}/profile/password-change`,
          {
              newPassword,
              reenteredPassword
          },
          {withCredentials: true}
      );
      setShowToast(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Error updating password. Please try again.");
      console.error("Error updating password:", err);
    }
  }


 return (
    user&&
    <>
    <div className="flex justify-center my-15">
    <div className= "flex justify-center mx-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Change Password</h2>
           <div>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">New Password</span>
              </div>
              <input type="password"
              value={newPassword} 
              // placeholder=" " 
              className="input input-bordered w-full max-w-xs" 
              onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Re-enter the password</span>
              </div>
              <input type="password"
              value={reenteredPassword}  
              placeholder=" " 
              className="input input-bordered w-full max-w-xs" 
              onChange={(e) => setReEnterPassword(e.target.value)}
              />
            </label>
            
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
          </div>
        </div>
      </div>
    </div>

    </div>
    <div className="toast toast-top toast-center">
    {showToast &&
    <div className="alert alert-success">
        <span>Password Updated Successfully.</span>
    </div>}
    </div>
    </>


  )

}

export default ChangePassword