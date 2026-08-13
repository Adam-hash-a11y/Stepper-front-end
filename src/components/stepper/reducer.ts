import {
  isValidFirstName,
  isValidLastName,
  isValidEmail,
  isValidPhoneNumber,
  isValidQuantity,
  isValidEventSelection,
  isValidTierSelection,
} from "../../helpers/stepperForm.validator";
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
} from "./actions";

interface Dj {
  name: string;
  day: string;
  time: string;
}

interface EventTier {
  id: string;
  name: string; // e.g. "Full Pass", "VIP", "1-Day"
  price: number;
  capacity: number;
  remaining: number;
}

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface TechnoEvent {
  id: string;
  name: string;
  dateRange: string; // e.g. "Aug 12 - Aug 14"
  djs: Dj[];
  tiers: EventTier[];
}

export interface State {
  events: TechnoEvent[];
  addons: Addon[];
  selection: {
    eventId: string;
    tierId: string;
  };
  attendee: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  order: {
    quantity: number;
    addons: string[];
  };
  touched: {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    phone: boolean;
    quantity: boolean;
    eventId: boolean;
    tierId: boolean;
  };
  errors: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    quantity: string;
    eventId: string;
    tierId: string;
  };
  disabled: boolean;
  totalPrice: number;
  bookingId: string;
  currentStep: number;
  totalSteps: number;
  submitted: boolean;
}

export const initialState: State = {
  events: [
    {
      id: "awakenings-2026",
      name: "Awakenings Festival",
      dateRange: "Jul 10 - Jul 12",
      djs: [
        { name: "Adam Beyer", day: "Jul 10", time: "22:00" },
        { name: "Charlotte de Witte", day: "Jul 11", time: "23:30" },
        { name: "Amelie Lens", day: "Jul 12", time: "22:30" },
        { name: "Boris Brejcha", day: "Jul 12", time: "01:00" },
      ],
      tiers: [
        {
          id: "day-pass",
          name: "Day Pass",
          price: 89,
          capacity: 1200,
          remaining: 856,
        },
        {
          id: "weekend",
          name: "Weekend Pass",
          price: 229,
          capacity: 700,
          remaining: 421,
        },
        {
          id: "vip",
          name: "VIP Experience",
          price: 399,
          capacity: 150,
          remaining: 48,
        },
      ],
    },

    {
      id: "timewarp-2026",
      name: "Time Warp",
      dateRange: "Apr 04 - Apr 05",
      djs: [
        { name: "Richie Hawtin", day: "Apr 04", time: "23:00" },
        { name: "Carl Cox", day: "Apr 05", time: "02:00" },
        { name: "Nina Kraviz", day: "Apr 05", time: "04:00" },
        { name: "Ben Klock", day: "Apr 05", time: "06:00" },
      ],
      tiers: [
        {
          id: "general",
          name: "General Admission",
          price: 119,
          capacity: 1000,
          remaining: 742,
        },
        {
          id: "premium",
          name: "Premium",
          price: 249,
          capacity: 250,
          remaining: 97,
        },
      ],
    },

    {
      id: "tomorrowland-freedom",
      name: "Tomorrowland - Freedom Stage",
      dateRange: "Jul 24 - Jul 26",
      djs: [
        { name: "Anyma", day: "Jul 24", time: "22:30" },
        { name: "Tale Of Us", day: "Jul 25", time: "23:45" },
        { name: "ARTBAT", day: "Jul 26", time: "21:30" },
        { name: "Mind Against", day: "Jul 26", time: "01:30" },
      ],
      tiers: [
        {
          id: "comfort",
          name: "Comfort Pass",
          price: 279,
          capacity: 400,
          remaining: 184,
        },
        {
          id: "vip",
          name: "VIP Sky Deck",
          price: 499,
          capacity: 120,
          remaining: 29,
        },
      ],
    },
  ],
  addons: [
    {
      id: "vip-tent",
      name: "VIP Tent Access",
      description: "Chill in a private shaded tent with your own bar",
      price: 45,
    },
    {
      id: "festival-tattoo",
      name: "Festival Tattoo",
      description: "Get inked by a resident artist, festival-exclusive design",
      price: 25,
    },
    {
      id: "glow-bracelet",
      name: "LED Glow Bracelet",
      description: "Light-up bracelet synced to the set, yours to keep",
      price: 15,
    },
    {
      id: "shuttle-pass",
      name: "Shuttle Pass",
      description: "Unlimited rides between the campsite and main stage",
      price: 20,
    },
  ],
  selection: {
    eventId: "",
    tierId: "",
  },

  attendee: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },

  order: {
    quantity: 0,
    addons: [],
  },

  totalPrice: 0,

  bookingId: "",

  currentStep: 1,

  totalSteps: 4,
  touched: {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    quantity: false,
    tierId: false,
    eventId: false,
  },
  errors: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    quantity: "",
    eventId: "",
    tierId: "",
  },

  disabled: true,
  submitted: false,
};
export const stepperReducer = (state: State, action: any) => {
  switch (action.type) {
    case SET_ATTENDEE_FIELD: {
      const newState = {
        ...state,
        attendee: {
          ...state.attendee,
          [action.payload.name]: action.payload.value,
        },
      };

      const newErrors = {
        ...state.errors,
        firstName: isValidFirstName(newState.attendee.firstName),
        lastName: isValidLastName(newState.attendee.lastName),
        email: isValidEmail(newState.attendee.email),
        phone: isValidPhoneNumber(newState.attendee.phone),
      };

      return {
        ...newState,
        errors: newErrors,
        disabled:
          state.currentStep === 1
            ? newErrors.firstName !== "" || newErrors.lastName !== ""
            : newErrors.email !== "" || newErrors.phone !== "",
      };
    }
    case SET_ORDER_FIELD: {
      const newState = {
        ...state,
        order: {
          ...state.order,
          [action.payload.name]: action.payload.value,
        },
      };

      const newErrors = {
        ...state.errors,
        quantity: isValidQuantity(Number(newState.order.quantity)),
      };

      return {
        ...newState,
        errors: newErrors,
        disabled: newErrors.quantity !== "",
      };
    }
    case SET_SELECTION: {
      let newSelection = {
        ...state.selection,
        [action.payload.name]: action.payload.value,
      };

      if (
        action.payload.name === "eventId" &&
        action.payload.value !== state.selection.eventId
      ) {
        newSelection.tierId = "";
      }

      const newTouched = {
        ...state.touched,
        [action.payload.name]: true,
      };

      const newErrors = {
        ...state.errors,
        eventId: isValidEventSelection(newSelection.eventId),
        tierId: isValidTierSelection(newSelection.tierId),
      };

      return {
        ...state,
        selection: newSelection,
        touched: newTouched,
        errors: newErrors,
        disabled: newErrors.eventId !== "" || newErrors.tierId !== "",
      };
    }

    case TOGGLE_ADDON: {
      const addedAddon = action.payload.addonId;
      const AddonsArray = state.order.addons;
      const updateAddonArray = AddonsArray.includes(addedAddon)
        ? AddonsArray.filter((addon) => addon !== addedAddon)
        : [...AddonsArray, addedAddon];

      const newState = {
        ...state,
        order: {
          ...state.order,
          addons: updateAddonArray,
        },
      };
      return newState;
    }
    case NEXT_STEP: {
      if (state.currentStep === state.totalSteps) {
        return state;
      }
      const newStep = state.currentStep + 1;
      return {
        ...state,
        currentStep: newStep,
        disabled:
          newStep === 1
            ? state.errors.firstName !== "" || state.errors.lastName !== ""
            : newStep === 2
              ? state.errors.email !== "" || state.errors.phone !== ""
              : newStep === 3
                ? state.selection.eventId === "" ||
                  state.selection.tierId === ""
                : newStep === 4
                  ? true
                  : false,
      };
    }
    case PREV_STEP: {
      if (state.currentStep === 1) {
        return state;
      }
      const newStep = state.currentStep - 1;
      return {
        ...state,
        currentStep: newStep,
        disabled:
          newStep === 1
            ? state.errors.firstName !== "" || state.errors.lastName !== ""
            : newStep === 2
              ? state.errors.email !== "" || state.errors.phone !== ""
              : newStep === 3
                ? state.selection.eventId === "" ||
                  state.selection.tierId === ""
                : newStep === 4
                  ? state.errors.quantity !== ""
                  : false,
      };
    }
    case SUBMIT_BOOKING: {
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
        submitted: true,
      };
    }
    case START_OVER: {
      return initialState;
    }
    case SET_TOUCHED: {
      const newTouched = { ...state.touched, [action.field]: true };
      const newErrors = { ...state.errors };

      switch (action.field) {
        case "firstName":
          newErrors.firstName = isValidFirstName(state.attendee.firstName);
          break;
        case "lastName":
          newErrors.lastName = isValidLastName(state.attendee.lastName);
          break;
        case "email":
          newErrors.email = isValidEmail(state.attendee.email);
          break;
        case "phone":
          newErrors.phone = isValidPhoneNumber(state.attendee.phone);
          break;
        case "quantity":
          newErrors.quantity = isValidQuantity(Number(state.order.quantity));
          break;
      }

      return { ...state, touched: newTouched, errors: newErrors };
    }
    default:
      return state;
  }
};
