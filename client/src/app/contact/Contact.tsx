import { useState } from "react";
import ContactCard from "../../components/contactCard/ContactCard";
import ContactInput from "../../components/contactInput/ContactInput";

const Contact: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-80 absolute top-24 left-1/2 transform -translate-x-1/2">
      <div
        className="bg-blue-500 text-white p-2 rounded-md mb-2 hover:cursor-pointer"
        onClick={handleShowModal}
      >
        Add contact
      </div>
      <ContactCard />
      {showModal && <ContactInput onCloseModal={handleCloseModal} />}
    </div>
  );
};

export default Contact;
