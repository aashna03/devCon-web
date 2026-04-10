import io from "socket.io-client";
import { BASE_URL } from "./constants";

// const backendUrl = `${BASE_URL}`;
export const createSocketConnection = () => {
    return io(BASE_URL, {
        path: "/socket.io", 
        withCredentials: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        transports: ["websocket", "polling"], 
    });
};

// import io from "socket.io-client";
// import { BASE_URL } from "./constants";

// export const createSocketConnection = () => {
//     // return io(BASE_URL)
//     if(location.hostname === "localhost"){
//         return io(BASE_URL);
//     }
//     else{
//         return io("/", {path: "/api/socket.io"});
//     }
// }