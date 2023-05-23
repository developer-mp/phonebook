import { useState } from "react";
import { mutate } from "swr";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineHome,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import IconBox from "../iconBox/IconBox";
import ContactInput from "../contactInput/ContactInput";
import { type IContactCard } from "./../../interface/ContactCard";

const SERVER_API_KEY = import.meta.env.VITE_SERVER_API_KEY;

const ContactCard: React.FC<IContactCard> = ({
  name,
  phone,
  mail,
  address,
  ID,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
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

  return (
    <div className="bg-white p-2 rounded-md border border-gray-300 flex items-center justify-between mb-1">
      <div className="text-left">
        <div className="font-bold">{name}</div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <AiOutlinePhone className="mr-1" />
          <div>{phone}</div>
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <AiOutlineMail className="mr-1" />
          <div>{mail}</div>
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <AiOutlineHome className="mr-1" />
          <div>{address}</div>
        </div>
      </div>
      <div className="flex items-center text-md hover:cursor-pointer">
        <div onClick={handleShowModal}>
          <IconBox icon={AiOutlineEdit} />
        </div>
        <div onClick={handleDelete}>
          <IconBox icon={AiOutlineDelete} />
        </div>
      </div>
      {showModal && (
        <ContactInput
          onCloseModal={handleCloseModal}
          initialName={name}
          initialPhone={phone}
          initialMail={mail}
          initialAddress={address}
          contactId={ID}
        />
      )}
    </div>
  );
};

export default ContactCard;
