import {
  NEXT_STEP,
  PREV_STEP,
  SET_ATTENDEE_FIELD,
  SET_ORDER_FIELD,
  SET_SELECTION,
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

interface TechnoEvent {
  id: string;
  name: string;
  dateRange: string; // e.g. "Aug 12 - Aug 14"
  djs: Dj[];
  tiers: EventTier[];
}

interface State {
  events: TechnoEvent[];
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
  totalPrice: number;
  bookingId: string;
  currentStep: number;
  totalSteps: number;
  errors: Record<string, string>;
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
    quantity: 1,
    addons: [],
  },

  totalPrice: 0,

  bookingId: "",

  currentStep: 1,

  totalSteps: 4,

  errors: {},

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
      return newState;
    }
    case SET_ORDER_FIELD: {
      const newState = {
        ...state,
        order: {
          ...state.order,
          [action.payload.name]: action.payload.value,
        },
      };
      return newState;
    }
    case SET_SELECTION: {
      const newState = {
        ...state,
        selection: {
          ...state.selection,
          [action.payload.name]: action.payload.value,
        },
      };
      return newState;
    }
    case NEXT_STEP: {
      if (state.currentStep === state.totalSteps) {
        return state;
      } else {
        return {
          ...state,
          currentStep: state.currentStep + 1,
        };
      }
    }
    case PREV_STEP: {
      if (state.currentStep === 1) {
        return { ...state };
      } else {
        return {
          ...state,
          currentStep: state.currentStep - 1,
        };
      }
    }
    default:
      return state;
  }
};
