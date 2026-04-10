import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoURL, age, gender, about, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err?.response?.data || err.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        {photoURL ? 
        (<img src={photoURL} alt="photo" />) 
        : 
        (
          <div className="w-full h-56 flex items-center justify-center text-sm opacity-70">
            No photo available
          </div>
        )}
      </figure>
      <div className="card-body">
        <>
        <h2 className="card-title">
          {firstName} {lastName&&<span>{ " " + lastName}</span>}
        </h2>
        <div>
        {age&&<span>{ age }</span>}{age&&gender&&<span>, </span>}{gender&&<span>{gender}</span>}
        </div>
        {about&&<p>{about}</p>}
        <div className="flex flex-wrap gap-2">
          {skills && skills.map((skill, index) => (
            <span key={index} className="badge bg-cyan-900">
              {skill}
            </span>
          ))}
        </div>
        </>


        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;