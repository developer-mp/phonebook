import { useState } from "react";
import ContactCard from "../../components/contactCard/ContactCard";
import ContactInput from "../../components/contactInput/ContactInput";
import useFetchContacts from "../../api/fetchContact";

const Contact: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { contacts } = useFetchContacts();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-80">
      <div className="text-2xl font-bold mb-4">Contacts</div>
      <div
        className="bg-blue-500 text-white p-2 rounded-md mb-2 hover:cursor-pointer"
        onClick={handleShowModal}
      >
        Add contact
      </div>
      {contacts?.map((contact) => (
        <ContactCard
          key={contact.ID}
          ID={contact.ID}
          name={contact.name}
          phone={contact.phone}
          mail={contact.mail}
          address={contact.address}
        />
      ))}
      {showModal && (
        <ContactInput
          onCloseModal={handleCloseModal}
          initialName={""}
          initialPhone={""}
          initialMail={""}
          initialAddress={""}
          contactId={0}
        />
      )}
    </div>
  );
};

export default Contact;
