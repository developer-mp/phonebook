import useSWR from "swr";
import { type IContactCard } from "../interface/ContactCard";
import { BASE_URL } from "./apiConfig";

const fetcher = (url: string) =>
  fetch(`${BASE_URL}/${url}`).then((res) => res.json());

const useFetchContacts = () => {
  const { data } = useSWR<IContactCard[]>("api/contact", fetcher);

  return {
    contacts: data,
  };
};

export default useFetchContacts;
