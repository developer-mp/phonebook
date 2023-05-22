import { useState } from "react";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineHome,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import IconBox from "../iconBox/IconBox";
import ContactInput from "../contactInput/ContactInput";

interface IContactCard {
  name: string;
  phone: string;
  mail: string;
  address: string;
}

const ContactCard: React.FC<IContactCard> = ({
  name = "Kevin",
  phone = "222222",
  mail = "kevin@gmail.com",
  address = "1 St",
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="bg-white p-2 rounded-md border border-gray-300 flex items-center justify-between">
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
        <IconBox icon={AiOutlineDelete} />
      </div>
      {showModal && (
        <ContactInput
          onCloseModal={handleCloseModal}
          initialName={name}
          initialPhone={phone}
          initialMail={mail}
          initialAddress={address}
        />
      )}
    </div>
  );
};

export default ContactCard;
