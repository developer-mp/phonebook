import { mutate } from "swr";

const SERVER_API_KEY = import.meta.env.VITE_SERVER_API_KEY;

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
      ? `${SERVER_API_KEY}/api/contact`
      : `${SERVER_API_KEY}/api/contact/${contactId}`;
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
