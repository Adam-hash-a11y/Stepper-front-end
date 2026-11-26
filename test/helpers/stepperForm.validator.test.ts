import { describe, expect, it } from "vitest";
import {
  isValidEmail,
  isValidFirstName,
  isValidLastName,
  isValidPhoneNumber,
  isValidQuantity,
} from "../../src/helpers/stepperForm.validator";

describe("stepperForm validators", () => {
  describe("first name", () => {
    it("should accept 3 characters and reject 2", () => {
      //ARRANGE
      const validName = "Ada";
      const shortName = "Ad";

      //ACT
      const validResult = isValidFirstName(validName);
      const shortResult = isValidFirstName(shortName);

      //ASSERT
      expect(validResult).toBe("");
      expect(shortResult).toBe("validation.firstName");
    });

    it("should reject a name made only of spaces", () => {
      //ARRANGE
      const blankName = "   ";

      //ACT
      const result = isValidFirstName(blankName);

      //ASSERT
      expect(result).toBe("validation.firstName");
    });
  });

  describe("last name", () => {
    it("should accept 3 characters and reject 2", () => {
      //ARRANGE
      const validName = "Lee";
      const shortName = "Li";

      //ACT
      const validResult = isValidLastName(validName);
      const shortResult = isValidLastName(shortName);

      //ASSERT
      expect(validResult).toBe("");
      expect(shortResult).toBe("validation.lastName");
    });

    it("should reject a name made only of spaces", () => {
      //ARRANGE
      const blankName = "   ";

      //ACT
      const result = isValidLastName(blankName);

      //ASSERT
      expect(result).toBe("validation.lastName");
    });
  });

  describe("email", () => {
    it("should accept a valid email", () => {
      //ARRANGE
      const email = "adam@example.com";

      //ACT
      const result = isValidEmail(email);

      //ASSERT
      expect(result).toBe("");
    });

    it("should reject an email without an @ or a domain", () => {
      //ARRANGE
      const emailWithoutAt = "adamexample.com";
      const emailWithoutDomain = "adam@";

      //ACT
      const withoutAtResult = isValidEmail(emailWithoutAt);
      const withoutDomainResult = isValidEmail(emailWithoutDomain);

      //ASSERT
      expect(withoutAtResult).toBe("validation.email");
      expect(withoutDomainResult).toBe("validation.email");
    });
  });

  describe("phone number", () => {
    it("should accept 8 digits and reject 7", () => {
      //ARRANGE
      const validPhone = "12345678";
      const shortPhone = "1234567";

      //ACT
      const validResult = isValidPhoneNumber(validPhone);
      const shortResult = isValidPhoneNumber(shortPhone);

      //ASSERT
      expect(validResult).toBe("");
      expect(shortResult).toBe("validation.phone");
    });

    it("should accept an international number with a plus and spaces", () => {
      //ARRANGE
      const phone = "+216 20 123 456";

      //ACT
      const result = isValidPhoneNumber(phone);

      //ASSERT
      expect(result).toBe("");
    });

    it("should reject a number that contains letters", () => {
      //ARRANGE
      const phone = "12345678a";

      //ACT
      const result = isValidPhoneNumber(phone);

      //ASSERT
      expect(result).toBe("validation.phone");
    });

    it("should not count spaces as digits", () => {
      //ARRANGE
      const phone = "1234 567";

      //ACT
      const result = isValidPhoneNumber(phone);

      //ASSERT
      expect(result).toBe("validation.phone");
    });
  });

  describe("ticket quantity", () => {
    it("should accept 1 and reject 0 and negative numbers", () => {
      //ARRANGE
      const spotsLeft = 10;

      //ACT
      const oneResult = isValidQuantity(1, spotsLeft);
      const zeroResult = isValidQuantity(0, spotsLeft);
      const negativeResult = isValidQuantity(-1, spotsLeft);

      //ASSERT
      expect(oneResult).toBe("");
      expect(zeroResult).toBe("validation.quantity");
      expect(negativeResult).toBe("validation.quantity");
    });

    it("should reject a decimal quantity", () => {
      //ARRANGE
      const spotsLeft = 10;

      //ACT
      const result = isValidQuantity(1.5, spotsLeft);

      //ASSERT
      expect(result).toBe("validation.quantity");
    });

    it("should accept all the spots left and reject one more", () => {
      //ARRANGE
      const spotsLeft = 48;

      //ACT
      const exactResult = isValidQuantity(48, spotsLeft);
      const tooManyResult = isValidQuantity(49, spotsLeft);

      //ASSERT
      expect(exactResult).toBe("");
      expect(tooManyResult).toBe("validation.quantityMax");
    });
  });
});
