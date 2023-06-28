import { mutate } from "swr";
import { BASE_URL } from "./apiConfig";

const deleteContact = async (ID: number | null) => {
  try {
    const endpoint = `${BASE_URL}/api/contact/${ID}`;

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
