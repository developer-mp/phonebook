import useSWR from "swr";
import { type IContactCard } from "../interface/ContactCard";

const SERVER_API_KEY = import.meta.env.VITE_SERVER_API_KEY;

const fetcher = (url: string) =>
  fetch(`${SERVER_API_KEY}/${url}`).then((res) => res.json());

const useFetchContacts = () => {
  const { data } = useSWR<IContactCard[]>("api/contact", fetcher);

  return {
    contacts: data,
  };
};

export default useFetchContacts;
