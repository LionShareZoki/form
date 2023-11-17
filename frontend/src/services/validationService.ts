export const validateEmail = (email: string): string | null => {
  if (email.trim() === "") {
    return "Required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Bad format";
  }
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (phone.trim() === "") {
    return "Required";
  } else if (!/^\+\d{10}$/.test(phone)) {
    return "Bad format";
  }
  return null;
};

export const validateText = (text: string): string | null => {
  return text.trim() === "" ? "Required" : null;
};
