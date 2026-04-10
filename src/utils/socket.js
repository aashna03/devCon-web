import io from "socket.io-client";
import { BASE_URL } from "./constants";

// This checks for the environment variable, or falls back to localhost
const SOCKET_URL = `${BASE_URL}/socket.io` || "http://localhost:3000";

export const createSocketConnection = () => {
    return io(SOCKET_URL);
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