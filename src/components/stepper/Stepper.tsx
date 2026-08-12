import React, { useReducer, useState } from "react";
import { initialState, stepperReducer } from "./reducer";
import {
  NEXT_STEP,
  PREV_STEP,
  SET_ATTENDEE_FIELD,
  SET_ORDER_FIELD,
  SET_SELECTION,
  START_OVER,
  SUBMIT_BOOKING,
  TOGGLE_ADDON,
} from "./actions";
import { PersonalInfoStep } from "../stepper-steps/personalInfoStep/PersonalInfoStep";
import { ContactStep } from "../stepper-steps/contactStep/ContactStep";
import { EventTierStep } from "../stepper-steps/eventTierStep/EventTierStep";
import { OrderStep } from "../stepper-steps/orderStep/OrderStep";
import { StepperButton } from "../shared/stepperButton/StepperButton";
import { CheckoutModal } from "../shared/checkoutModal/CheckoutModal";
import { BookingSummary } from "../bookingSummary/BookingSummary";
import { ProgressBar } from "../progressBar/ProgressBar";
export const Stepper = () => {
  const [state, dispatch] = useReducer(stepperReducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SET_ATTENDEE_FIELD,
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const handleTicketQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch({
      type: SET_ORDER_FIELD,
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const handleAddonCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: TOGGLE_ADDON,
      payload: {
        addonId: e.target.value,
      },
    });
  };
  const handleEventSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: SET_SELECTION,
      payload: {
        name: "eventId",
        value: e.currentTarget.id,
      },
    });
  };

  const handleSelectTier = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: SET_SELECTION,
      payload: {
        name: "tierId",
        value: e.currentTarget.id,
      },
    });
  };

  const handleNextStep = () => {
    dispatch({ type: NEXT_STEP });
  };
  const handlePrevStep = () => {
    dispatch({ type: PREV_STEP });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmBooking = (totalPrice: number) => {
    dispatch({ type: SUBMIT_BOOKING, payload: { totalPrice } });
    setIsModalOpen(false);
  };
  const handleStartOver = () => {
    dispatch({ type: START_OVER });
  };

  return (
    <>
      {state.submitted ? (
        <>
          <p>We'll see you in the Berlin</p>
          <StepperButton handleButton={handleStartOver} label="go back home" />
        </>
      ) : (
        <>
          <ProgressBar step={state.currentStep} />
          {state.currentStep === 1 && (
            <PersonalInfoStep
              attendee={state.attendee}
              handleInputChange={handleInputChange}
            />
          )}
          {state.currentStep === 2 && (
            <ContactStep
              attendee={state.attendee}
              handleInputChange={handleInputChange}
            />
          )}

          {state.currentStep === 3 && (
            <EventTierStep
              events={state.events}
              selection={state.selection}
              handleEventSelection={handleEventSelect}
              handleTierSelection={handleSelectTier}
            />
          )}
          {state.currentStep === 4 && (
            <OrderStep
              order={state.order}
              handleTicketQuantity={handleTicketQuantityChange}
              addons={state.addons}
              handleCheckBoxToggle={handleAddonCheckBox}
            />
          )}

          {state.currentStep === 4 ? (
            <>
              <StepperButton handleButton={handleOpenModal} label="Checkout" />
              {isModalOpen && (
                <CheckoutModal
                  handleClose={handleCloseModal}
                  isOpen={isModalOpen}
                >
                  <BookingSummary
                    attendee={state.attendee}
                    events={state.events}
                    addons={state.addons}
                    selection={state.selection}
                    order={state.order}
                    handleValidate={handleConfirmBooking}
                  />
                </CheckoutModal>
              )}
            </>
          ) : (
            <StepperButton handleButton={handleNextStep} label="Next" />
          )}

          {state.currentStep !== 1 && (
            <StepperButton handleButton={handlePrevStep} label="Previous" />
          )}
        </>
      )}
    </>
  );
};
