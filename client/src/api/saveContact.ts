import { mutate } from "swr";

const ENV = import.meta.env.ENV;
const SERVER_DEV_API = import.meta.env.VITE_SERVER_DEV_API_KEY;
const SERVER_PROD_API = import.meta.env.VITE_SERVER_PROD_API_KEY;
const BASE_URL = ENV === "production" ? SERVER_PROD_API : SERVER_DEV_API;

const saveContact = async (
  name: string,
  phone: string,
  mail: string,
  address: string,
  contactId: number | null,
  onCloseModal: () => void
) => {
  try {
    const isNewRecord = contactId === 0;
    const endpoint = isNewRecord
      ? `${BASE_URL}/contact`
      : `${BASE_URL}/contact/${contactId}`;
    const method = isNewRecord ? "POST" : "PUT";

    const response = await fetch(endpoint, {
      method,
      body: JSON.stringify({ name, phone, mail, address }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      onCloseModal();
      mutate("api/contact");
    } else {
      console.error("Error saving contact: ", response.statusText);
    }
  } catch (error) {
    console.error("Error saving contact: ", error);
  }
};

export default saveContact;
