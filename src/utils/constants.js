// export const BASE_URL = 
//     location.hostname === "localhost" ? "http://localhost:3000" : "/api";

const backendUrl =
	import.meta.env.VITE_BACKEND_URL ||
	import.meta.env.BACKEND_URL ||
	"http://localhost:3000";

export const BASE_URL = backendUrl.replace(/\/$/, "");