import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [hasRetriedAtOne, setHasRetriedAtOne] = useState(false);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // This will add 10 new users to the Redux store
      dispatch(addFeed(res?.data?.data)); 
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
      return;
    }

    if (feed.length === 1 && !hasRetriedAtOne) {
      setHasRetriedAtOne(true);
      getFeed();
      return;
    }

    if (feed.length > 1 && hasRetriedAtOne) {
      setHasRetriedAtOne(false);
    }
  }, [feed, hasRetriedAtOne]);

  // Return nothing while initial load is happening
  if (!feed) return null;

  // Show empty state only if the API call finishes and returns nothing
  if (feed.length === 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;

  return (
    <div className="flex justify-center my-10">
      {/* Assuming feed[0] is the current user being shown */}
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
