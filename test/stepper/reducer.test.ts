import { describe, expect, it, vi } from "vitest";
import {
  initialState,
  stepperReducer,
  type State,
} from "../../src/components/stepper/reducer";
import {
  NEXT_STEP,
  PREV_STEP,
  SET_ATTENDEE_FIELD,
  SET_ORDER_FIELD,
  SET_SELECTION,
  SET_TOUCHED,
  START_OVER,
  SUBMIT_BOOKING,
  TOGGLE_ADDON,
} from "../../src/components/stepper/actions";

const validState: State = {
  ...initialState,
  attendee: {
    firstName: "Adam",
    lastName: "Hamdi",
    email: "adam@example.com",
    phone: "12345678",
  },
  selection: { eventId: "awakenings-2026", tierId: "day-pass" },
  order: { quantity: 2, addons: [] },
  disabled: false,
};

describe("stepperReducer", () => {
  describe("attendee fields", () => {
    it("should save the typed field and keep the others", () => {
      //ARRANGE
      const action = {
        type: SET_ATTENDEE_FIELD,
        payload: { name: "firstName", value: "Sara" },
      } as const;

      //ACT
      const result = stepperReducer(validState, action);

      //ASSERT
      expect(result.attendee).toEqual({
        ...validState.attendee,
        firstName: "Sara",
      });
    });

    it("should remove letters from the phone number", () => {
      //ARRANGE
      const action = {
        type: SET_ATTENDEE_FIELD,
        payload: { name: "phone", value: "12ab34" },
      } as const;

      //ACT
      const result = stepperReducer(validState, action);

      //ASSERT
      expect(result.attendee.phone).toBe("1234");
    });
  });

  describe("validation", () => {
    it("should enable Next on step 1 only when both names are valid", () => {
      //ARRANGE
      const state = { ...validState, disabled: true };
      const shortFirstName = {
        type: SET_ATTENDEE_FIELD,
        payload: { name: "firstName", value: "Ad" },
      } as const;
      const shortLastName = {
        type: SET_ATTENDEE_FIELD,
        payload: { name: "lastName", value: "Ha" },
      } as const;
      const goodFirstName = {
        type: SET_ATTENDEE_FIELD,
        payload: { name: "firstName", value: "Sara" },
      } as const;

      //ACT
      const firstNameResult = stepperReducer(state, shortFirstName);
      const lastNameResult = stepperReducer(state, shortLastName);
      const validResult = stepperReducer(state, goodFirstName);

      //ASSERT
      expect(firstNameResult.disabled).toBe(true);
      expect(lastNameResult.disabled).toBe(true);
      expect(validResult.disabled).toBe(false);
    });

    it("should enable Next on step 2 only when email and phone are valid", () => {
      //ARRANGE
      const state = { ...validState, currentStep: 2, disabled: true };
      const badEmail = {
        type: SET_ATTENDEE_FIELD,
        payload: { name: "email", value: "adam" },
      } as const;
      const shortPhone = {
        type: SET_ATTENDEE_FIELD,
        payload: { name: "phone", value: "123" },
      } as const;
      const goodPhone = {
        type: SET_ATTENDEE_FIELD,
        payload: { name: "phone", value: "87654321" },
      } as const;

      //ACT
      const emailResult = stepperReducer(state, badEmail);
      const phoneResult = stepperReducer(state, shortPhone);
      const validResult = stepperReducer(state, goodPhone);

      //ASSERT
      expect(emailResult.disabled).toBe(true);
      expect(phoneResult.disabled).toBe(true);
      expect(validResult.disabled).toBe(false);
    });
  });

  describe("event and pass selection", () => {
    it("should enable Next only when both an event and a pass are selected", () => {
      //ARRANGE
      const state = { ...initialState, currentStep: 3 };
      const selectEvent = {
        type: SET_SELECTION,
        payload: { name: "eventId", value: "awakenings-2026" },
      } as const;
      const selectTier = {
        type: SET_SELECTION,
        payload: { name: "tierId", value: "day-pass" },
      } as const;

      //ACT
      const eventResult = stepperReducer(state, selectEvent);
      const tierResult = stepperReducer(eventResult, selectTier);

      //ASSERT
      expect(eventResult.disabled).toBe(true);
      expect(tierResult.disabled).toBe(false);
    });

    it("should clear the pass and disable Next when the event changes", () => {
      //ARRANGE
      const state = { ...validState, currentStep: 3 };
      const action = {
        type: SET_SELECTION,
        payload: { name: "eventId", value: "timewarp-2026" },
      } as const;

      //ACT
      const result = stepperReducer(state, action);

      //ASSERT
      expect(result.selection).toEqual({
        eventId: "timewarp-2026",
        tierId: "",
      });
      expect(result.disabled).toBe(true);
    });
  });

  describe("order", () => {
    it("should add and remove an add-on without blocking checkout", () => {
      //ARRANGE
      const state = { ...validState, currentStep: 4 };
      const action = {
        type: TOGGLE_ADDON,
        payload: { addonId: "vip-tent" },
      } as const;

      //ACT
      const addedResult = stepperReducer(state, action);
      const removedResult = stepperReducer(addedResult, action);

      //ASSERT
      expect(addedResult.order.addons).toEqual(["vip-tent"]);
      expect(addedResult.disabled).toBe(false);
      expect(removedResult.order.addons).toEqual([]);
      expect(removedResult.disabled).toBe(false);
    });

    it("should enable checkout for 1 ticket and disable it for 0", () => {
      //ARRANGE
      const state = { ...validState, currentStep: 4 };
      const oneTicket = {
        type: SET_ORDER_FIELD,
        payload: { name: "quantity", value: "1" },
      } as const;
      const noTickets = {
        type: SET_ORDER_FIELD,
        payload: { name: "quantity", value: "0" },
      } as const;

      //ACT
      const oneResult = stepperReducer(state, oneTicket);
      const zeroResult = stepperReducer(state, noTickets);

      //ASSERT
      expect(oneResult.disabled).toBe(false);
      expect(zeroResult.disabled).toBe(true);
    });

    it("should disable checkout when the quantity is above the spots left", () => {
      //ARRANGE
      const state: State = {
        ...validState,
        currentStep: 4,
        selection: { eventId: "awakenings-2026", tierId: "vip" },
      };
      const action = {
        type: SET_ORDER_FIELD,
        payload: { name: "quantity", value: "49" },
      } as const;

      //ACT
      const result = stepperReducer(state, action);

      //ASSERT
      expect(result.errors.quantity).toBe("validation.quantityMax");
      expect(result.disabled).toBe(true);
    });
  });

  describe("navigation", () => {
    it("should move to the next step with Next disabled until it is complete", () => {
      //ARRANGE
      const typeFirstName = {
        type: SET_ATTENDEE_FIELD,
        payload: { name: "firstName", value: "Adam" },
      } as const;
      const typeLastName = {
        type: SET_ATTENDEE_FIELD,
        payload: { name: "lastName", value: "Hamdi" },
      } as const;
      const firstNameState = stepperReducer(initialState, typeFirstName);
      const namesState = stepperReducer(firstNameState, typeLastName);

      //ACT
      const result = stepperReducer(namesState, { type: NEXT_STEP });

      //ASSERT
      expect(result.currentStep).toBe(2);
      expect(result.disabled).toBe(true);
    });

    it("should go back and keep every value with Next enabled", () => {
      //ARRANGE
      const state: State = {
        ...validState,
        currentStep: 3,
        order: { quantity: 2, addons: ["vip-tent"] },
        disabled: true,
      };

      //ACT
      const result = stepperReducer(state, { type: PREV_STEP });

      //ASSERT
      expect(result.currentStep).toBe(2);
      expect(result.attendee).toEqual(state.attendee);
      expect(result.selection).toEqual(state.selection);
      expect(result.order).toEqual(state.order);
      expect(result.disabled).toBe(false);
    });

    it("should stay on step 1 when going back from step 1", () => {
      //ARRANGE
      const action = { type: PREV_STEP } as const;

      //ACT
      const result = stepperReducer(validState, action);

      //ASSERT
      expect(result).toBe(validState);
    });

    it("should recheck the quantity after switching to a smaller pass", () => {
      //ARRANGE
      const state: State = {
        ...validState,
        currentStep: 3,
        order: { quantity: 100, addons: [] },
      };
      const selectSmallerPass = {
        type: SET_SELECTION,
        payload: { name: "tierId", value: "vip" },
      } as const;
      const smallerPassState = stepperReducer(state, selectSmallerPass);

      //ACT
      const result = stepperReducer(smallerPassState, { type: NEXT_STEP });

      //ASSERT
      expect(result.errors.quantity).toBe("validation.quantityMax");
      expect(result.disabled).toBe(true);
    });
  });

  describe("blur", () => {
    it("should mark only the left field as touched and set its error", () => {
      //ARRANGE
      const action = { type: SET_TOUCHED, field: "email" } as const;

      //ACT
      const result = stepperReducer(initialState, action);

      //ASSERT
      expect(result.touched).toEqual({ ...initialState.touched, email: true });
      expect(result.errors.email).toBe("validation.email");
      expect(result.errors.firstName).toBe("");
    });
  });

  describe("booking", () => {
    it("should save the total and the booking ID when submitted", () => {
      //ARRANGE
      vi.spyOn(crypto, "randomUUID").mockReturnValueOnce(
        "abcd1234-1111-2222-3333-444455556666",
      );
      const action = {
        type: SUBMIT_BOOKING,
        payload: { totalPrice: 178 },
      } as const;

      //ACT
      const result = stepperReducer(validState, action);

      //ASSERT
      expect(result.totalPrice).toBe(178);
      expect(result.bookingId).toBe("VLT-ABCD1234");
      expect(result.submitted).toBe(true);
    });

    it("should reset the whole booking on start over", () => {
      //ARRANGE
      const state: State = {
        ...validState,
        currentStep: 4,
        totalPrice: 178,
        bookingId: "VLT-ABCD1234",
        submitted: true,
      };

      //ACT
      const result = stepperReducer(state, { type: START_OVER });

      //ASSERT
      expect(result).toEqual(initialState);
    });
  });
});
