import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { type IContactInput } from "./../../interface/ContactInput";
import { mutate } from "swr";

const ENDPOINT = "http://localhost:4000";

const ContactInput: React.FC<IContactInput> = ({
  onCloseModal,
  initialName,
  initialPhone,
  initialMail,
  initialAddress,
  contactId,
}) => {
  const [name, setName] = useState<string>(initialName || "");
  const [phone, setPhone] = useState<string>(initialPhone || "");
  const [mail, setMail] = useState<string>(initialMail || "");
  const [address, setAddress] = useState<string>(initialAddress || "");
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const isNewRecord =
    !initialName && !initialPhone && !initialMail && !initialAddress;

  useEffect(() => {
    updateSaveDisabledState(name, phone);
  }, [name, phone]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
  };

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const updateSaveDisabledState = (name: string, phone: string) => {
    const isDisabled = name?.trim() === "" || phone?.trim() === "";
    setIsSaveDisabled(isDisabled);
  };

  const handleClose = () => {
    onCloseModal();
  };

  const handleClick = async () => {
    try {
      const endpoint = isNewRecord
        ? `${ENDPOINT}/api/contact`
        : `${ENDPOINT}/api/contact/${contactId}`;
      const method = isNewRecord ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify({ name, phone, mail, address }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        handleClose();
        mutate("api/contact");
      }
    } catch (error) {
      console.error("Error saving contact: ", error);
    }
  };

  const formatPhone = (phone: string) => {
    const cleanedPhone = phone.replace(/\D/g, "");
    const formattedPhone =
      cleanedPhone.slice(0, 3) +
      "-" +
      cleanedPhone.slice(3, 5) +
      "-" +
      cleanedPhone.slice(5, 7);
    return formattedPhone;
  };

  return (
    <Modal show={true} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isNewRecord ? "Add new contact" : "Edit contact"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
            <Form.Label>
              Name <span className="text-red-500">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              autoFocus
              required
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
            <Form.Label>
              Phone <span className="text-red-500">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              autoFocus
              required
              value={phone}
              onChange={handlePhoneChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              autoFocus
              value={mail}
              onChange={handleMailChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={address}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="w-18">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleClick}
          disabled={isSaveDisabled}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactInput;
