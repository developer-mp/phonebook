import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Group, TextInput } from "@mantine/core";
// import { ENDPOINT, Contact } from "../App";
import { KeyedMutator } from "swr";
import Navbar from "./navbar/Navbar";

const InputField = () => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  //   async function addContact(values: {
  //     name: string;
  //     phone: string;
  //     email: string;
  //     address: string;
  //   }) {
  //     const updated = await fetch(`${ENDPOINT}/api/contact`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(values),
  //     }).then((res) => res.json());
  //     form.reset();
  //     setOpen(false);
  //     return updated;
  //   }

  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Add new contact"
      >
        <form
        // onSubmit={form.onSubmit(addContact)}
        >
          <TextInput required label="Name" {...form.getInputProps("name")} />
          <TextInput required label="Phone" {...form.getInputProps("phone")} />
          <TextInput label="Email" {...form.getInputProps("email")} />
          <TextInput label="Address" {...form.getInputProps("address")} />
          <Button type="submit">Add</Button>
        </form>
      </Modal>
      <Group position="center">
        <Navbar />
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          Create record
        </Button>
      </Group>
    </>
  );
};

export default InputField;

// // import { useState } from "react";
// // import { useForm } from "@mantine/form";
// // import { Button, Modal, Group, TextInput } from "@mantine/core";
// // import { ENDPOINT, Contact } from "../App";
// // import { KeyedMutator } from "swr";

// // const InputField = ({ mutate }: { mutate: KeyedMutator<Contact[]> }) => {
// //   const [open, setOpen] = useState(false);
// //   const form = useForm({
// //     initialValues: {
// //       name: "",
// //       phone: "",
// //       email: "",
// //       address: "",
// //     },
// //   });

// //   async function addContact(values: {
// //     name: string;
// //     phone: string;
// //     email: string;
// //     address: string;
// //   }) {
// //     const updated = await fetch(`${ENDPOINT}/api/contact`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(values),
// //     }).then((res) => res.json());
// //     mutate(updated);
// //     form.reset();
// //     setOpen(false);
// //   }

// //   return (
// //     <>
// //       <Modal
// //         opened={open}
// //         onClose={() => setOpen(false)}
// //         title="Add new contact"
// //       >
// //         <form onSubmit={form.onSubmit(addContact)}>
// //           <TextInput required label="Name" {...form.getInputProps("name")} />
// //           <TextInput required label="Phone" {...form.getInputProps("phone")} />
// //           <TextInput label="Email" {...form.getInputProps("email")} />
// //           <TextInput label="Address" {...form.getInputProps("address")} />
// //           <Button type="submit">Add</Button>
// //         </form>
// //       </Modal>
// //       <Group position="center">
// //         <Button fullWidth mb={12} onClick={() => setOpen(true)}>
// //           Create record
// //         </Button>
// //       </Group>
// //     </>
// //   );
// // };

// // export default InputField;
