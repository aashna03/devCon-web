import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";



const Requests = () => {

    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const fetchRequests = async() => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`,
                {withCredentials: true});
            
            console.log("Requests data:", res.data.data);
            dispatch(addRequests(res.data.data));
            
        } catch (err) {
            console.error("Error fetching requests:",  err.message);
        }
    }
    useEffect(() => {
        fetchRequests();
    }, []);
    
    const handleReviewRequest = async (status, requestId) => {
    try {
        const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {}, // not payload required for this endpoint
        { withCredentials: true }
        );
        dispatch(removeRequest(requestId));
    } catch (err) {
        console.error("Error sending request:", err?.response?.data || err.message);
    }
    };


  if (!requests || requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;


  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 w-2/3 rounded-lg bg-base-300 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName} {lastName&&<span>{ " " + lastName}</span>}
              </h2>
              {/* {age&&<span>{ age }</span>} {age&&gender&&<span>, </span>} {gender&&<span>{gender}</span>} */}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => handleReviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => handleReviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests