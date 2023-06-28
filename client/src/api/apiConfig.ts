const ENV = import.meta.env.VITE_ENV;
const SERVER_API_KEY = import.meta.env.VITE_SERVER_API_KEY;
const BASE_URL = ENV === "development" ? SERVER_API_KEY : "";

export { BASE_URL };
