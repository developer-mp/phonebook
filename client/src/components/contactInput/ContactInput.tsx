import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface IContactInput {
  onCloseModal: () => void;
  initialName: string;
  initialPhone: string;
}

const ContactInput: React.FC<IContactInput> = ({
  onCloseModal,
  initialName,
  initialPhone,
}) => {
  const [name, setName] = useState<string>(initialName || "");
  const [phone, setPhone] = useState<string>(initialPhone || "");
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  useEffect(() => {
    updateSaveDisabledState(name, phone);
  }, [name, phone]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const updateSaveDisabledState = (name: string, phone: string) => {
    const isDisabled = name?.trim() === "" || phone?.trim() === "";
    setIsSaveDisabled(isDisabled);
  };

  const handleClose = () => {
    onCloseModal();
  };

  const handleSave = () => {
    handleClose();
  };

  return (
    <Modal show={true} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new contact</Modal.Title>
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
            <Form.Control type="email" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="w-18">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleClose}
          disabled={isSaveDisabled}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactInput;
