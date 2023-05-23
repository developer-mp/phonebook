import { useState } from "react";
import ContactCard from "../../components/contactCard/ContactCard";
import ContactInput from "../../components/contactInput/ContactInput";
import useSWR from "swr";
import { type IContactCard } from "./../../interface/ContactCard";

const ENDPOINT = "http://localhost:4000";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

const Contact: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { data } = useSWR<IContactCard[]>("api/contact", fetcher);

  return (
    <div className="w-80">
      <div className="text-2xl font-bold mb-4">Contacts</div>
      <div
        className="bg-blue-500 text-white p-2 rounded-md mb-2 hover:cursor-pointer"
        onClick={handleShowModal}
      >
        Add contact
      </div>
      {data?.map((contact) => (
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
