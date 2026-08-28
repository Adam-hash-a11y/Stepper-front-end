import validator from "validator";

export const isValidFirstName = (value: string) => {
  if (value.length >= 3) {
    return "";
  } else {
    return "First name must be at least 3 characters";
  }
};

export const isValidLastName = (value: string) => {
  if (value.length >= 3) {
    return "";
  } else {
    return "Last name must be at least 3 characters";
  }
};

export const isValidEmail = (value: string) => {
  if (validator.isEmail(value)) {
    return "";
  } else {
    return "Email must be valid";
  }
};

export const isValidPhoneNumber = (value: string) => {
  if (value.length >= 8) {
    return "";
  } else {
    return "Phone number must be at least 8 characters";
  }
};

export const isValidQuantity = (value: number) => {
  if (value >= 1) {
    return "";
  } else {
    return "Quantity must be at least 1";
  }
};
