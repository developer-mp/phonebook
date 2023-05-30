export const formatPhone = (phone: string) => {
  const cleanedPhone = phone.replace(/\D/g, "");
  const formattedPhone =
    cleanedPhone.slice(0, 3) +
    "-" +
    cleanedPhone.slice(3, 5) +
    "-" +
    cleanedPhone.slice(5, 7);
  return formattedPhone;
};
