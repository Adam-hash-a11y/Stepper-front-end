export const SET_ATTENDEE_FIELD = "set_attendee_field";
export const SET_ORDER_FIELD = "set_order_field";
export const SET_SELECTION = "set_selection";
export const NEXT_STEP = "next_step";
export const PREV_STEP = "prev_step";
export const TOGGLE_ADDON = "toggle_addon";
export const SUBMIT_BOOKING = "submit_booking";
export const START_OVER = "start_over";
export const SET_TOUCHED = "set_touched";

export type Action =
  | {
      type: typeof SET_ATTENDEE_FIELD;
      payload: { name: string; value: string };
    }
  | {
      type: typeof SET_ORDER_FIELD;
      payload: { name: string; value: string };
    }
  | {
      type: typeof SET_SELECTION;
      payload: { name: "eventId" | "tierId"; value: string };
    }
  | {
      type: typeof TOGGLE_ADDON;
      payload: { addonId: string };
    }
  | {
      type: typeof SUBMIT_BOOKING;
      payload: { totalPrice: number };
    }
  | {
      type: typeof SET_TOUCHED;
      field: string;
    }
  | { type: typeof NEXT_STEP }
  | { type: typeof PREV_STEP }
  | { type: typeof START_OVER };
