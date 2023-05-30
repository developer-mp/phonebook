import { mutate } from "swr";

const SERVER_API_KEY = import.meta.env.VITE_SERVER_API_KEY;

const deleteContact = async (ID: number | null) => {
  try {
    const endpoint = `${SERVER_API_KEY}/api/contact/${ID}`;

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
