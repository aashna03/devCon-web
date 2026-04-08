import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;


  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    // send events,data to the backend through socket connection, so that backend can identify which user has joined the chat and can send messages to that user accordingly, and also can save chat messages in the database with sender and receiver information
    socket.emit("joinChat", {
    //   firstName: user.firstName,
      userId,
      targetUserId,
    });

    // listen for messages from the backend through socket connection, and update the messages state to display the new message in the chat window
    socket.on("messageReceived", ({ firstName, lastName, newMessage }) => {
      console.log(firstName + " :  " + newMessage);
      setMessages((messages) => [...messages, { firstName, lastName, newMessage }]);
      console.log(messages)
    });
    // when the component unmounts, disconnect the socket connection to avoid memory leaks and unnecessary connections
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " + 
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                <span>{msg.firstName}</span> <span>{msg.lastName}</span>
                <time className="text-xs opacity-50"> 2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.newMessage}</div> 
              {/* here new msg are all the messages in the messages */}
              {/* <div className="chat-footer opacity-50">Seen</div> */}
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;