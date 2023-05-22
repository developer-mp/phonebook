// import "./App.css";
// import useSWR from "swr";
// import InputField from "./components/InputField";
// import { Box, List } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";

// export interface Contact {
//   ID: number;
//   name: string;
//   phone: string;
//   email: string;
//   address: string;
// }

// export const ENDPOINT = "http://localhost:4000";

// const fetcher = (url: string) =>
//   fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

function App() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
}
// const { data } = useSWR<Contact[]>("api/contact", fetcher);
// console.log(data);
// return (
// <Box>
//   <List spacing="xs" size="sm">
//     {data?.map((contact) => {
//       return (
//         <List.Item key={contact.ID}>
//           {contact.name}
//           {contact.phone}
//           {contact.email}
//           {contact.address}
//         </List.Item>
//       );
//     })}
//   </List>
// <InputField />
// </Box>
// );

export default App;

// import "./App.css";
// import useSWR from "swr";
// import InputField from "./components/InputField";
// import { Box, List } from "@mantine/core";

// export interface Contact {
//   ID: number;
//   name: string;
//   phone: string;
//   email: string;
//   address: string;
// }

// export const ENDPOINT = "http://localhost:4000";

// const fetcher = (url: string) =>
//   fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

// function App() {
//   const { data, mutate } = useSWR<Contact[]>("api/contact", fetcher);

//   return (
//     <Box>
//       <List spacing="xs" size="sm">
//         {data &&
//           data.map((contact) => {
//             return (
//               <List.Item key={contact.ID}>
//                 {contact.name}
//                 {contact.phone}
//                 {contact.email}
//                 {contact.address}
//               </List.Item>
//             );
//           })}
//       </List>
//       <InputField mutate={mutate} />
//     </Box>
//   );
// }

// export default App;
