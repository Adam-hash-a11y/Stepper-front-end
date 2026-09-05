import validator from "validator";
import type { TFunction } from "i18next";

export const isValidFirstName = (value: string, t: TFunction) => {
  if (value.length >= 3) {
    return "";
  } else {
    return t("validation.firstName");
  }
};

export const isValidLastName = (value: string, t: TFunction) => {
  if (value.length >= 3) {
    return "";
  } else {
    return t("validation.lastName");
  }
};

export const isValidEmail = (value: string, t: TFunction) => {
  if (validator.isEmail(value)) {
    return "";
  } else {
    return t("validation.email");
  }
};

export const isValidPhoneNumber = (value: string, t: TFunction) => {
  if (value.length >= 8) {
    return "";
  } else {
    return t("validation.phone");
  }
};

export const isValidQuantity = (value: number, t: TFunction) => {
  if (value >= 1) {
    return "";
  } else {
    return t("validation.quantity");
  }
};
