import { mutate } from "swr";

const ENV = import.meta.env.ENV;
const SERVER_DEV_API = import.meta.env.VITE_SERVER_DEV_API_KEY;
const SERVER_PROD_API = import.meta.env.VITE_SERVER_PROD_API_KEY;
const BASE_URL = ENV === "production" ? SERVER_PROD_API : SERVER_DEV_API;

const deleteContact = async (ID: number | null) => {
  try {
    const endpoint = `${BASE_URL}/contact/${ID}`;

    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      mutate("api/contact");
    }
  } catch (error) {
    console.error("Error deleting contact: ", error);
  }
};

export default deleteContact;
