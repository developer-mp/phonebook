import useSWR from "swr";
import { type IContactCard } from "../interface/ContactCard";

const ENV = import.meta.env.ENV;
const SERVER_DEV_API = import.meta.env.VITE_SERVER_DEV_API_KEY;
const SERVER_PROD_API = import.meta.env.VITE_SERVER_PROD_API_KEY;
const BASE_URL = ENV === "production" ? SERVER_PROD_API : SERVER_DEV_API;

const fetcher = (url: string) =>
  fetch(`${BASE_URL}/${url}`).then((res) => res.json());

const useFetchContacts = () => {
  const { data } = useSWR<IContactCard[]>("contact", fetcher);

  return {
    contacts: data,
  };
};

export default useFetchContacts;
