import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Connections = () => {

    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async() => {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, 
                {withCredentials: true});
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error("Error fetching connections:", err?.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections || connections.length === 0) {
        return <h1 className="flex justify-center text-2xl">No Connections Found!</h1>
    }

 return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
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
              {age&&<span>{ age }</span>} {age&&gender&&<span>, </span>} {gender&&<span>{gender}</span>}
              <p>{about}</p>
            </div>
            <Link to={"/chat/"+_id} className="ml-auto">
            <button className="btn btn-primary h-10 self-start ">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;