import validator from "validator";

export const isValidFirstName = (value: string) => {
  if (value.trim().length >= 3) {
    return "";
  } else {
    return "validation.firstName";
  }
};

export const isValidLastName = (value: string) => {
  if (value.trim().length >= 3) {
    return "";
  } else {
    return "validation.lastName";
  }
};

export const isValidEmail = (value: string) => {
  if (validator.isEmail(value)) {
    return "";
  } else {
    return "validation.email";
  }
};

export const isValidPhoneNumber = (value: string) => {
  const hasOnlyPhoneCharacters = /^\+?[0-9 ]+$/.test(value);
  const digitCount = value.replace(/\D/g, "").length;

  if (hasOnlyPhoneCharacters && digitCount >= 8) {
    return "";
  } else {
    return "validation.phone";
  }
};

export const isValidQuantity = (value: number, spotsLeft: number) => {
  if (!Number.isInteger(value) || value < 1) {
    return "validation.quantity";
  }

  if (value > spotsLeft) {
    return "validation.quantityMax";
  }

  return "";
};
