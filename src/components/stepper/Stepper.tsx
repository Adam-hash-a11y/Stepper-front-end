import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { initialState, stepperReducer } from "./reducer";
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
import { PersonalInfoStep } from "../stepper-steps/personalInfoStep/PersonalInfoStep";
import { ContactStep } from "../stepper-steps/contactStep/ContactStep";
import { EventTierStep } from "../stepper-steps/eventTierStep/EventTierStep";
import { OrderStep } from "../stepper-steps/orderStep/OrderStep";
import { StepperButton } from "../shared/stepperButton/StepperButton";
import { CheckoutModal } from "../shared/checkoutModal/CheckoutModal";
import { BookingSummary } from "../bookingSummary/BookingSummary";
import { ProgressBar } from "../progressBar/ProgressBar";
import { ConfirmationScreen } from "../confirmationScreen/ConfirmationScreen";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const PageWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 48px 80px;
`;

const StepContent = styled.div`
  margin-bottom: 48px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const RequiredFieldsNote = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #888888;
  margin-bottom: 24px;
`;

const RequiredStar = styled.span`
  color: #dc2626;
`;

export const Stepper = () => {
  const [state, dispatch] = useReducer(stepperReducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  console.log(state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(state);
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
        value:
          state.selection.eventId === e.currentTarget.id
            ? ""
            : e.currentTarget.id,
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
    toast.success("🎟️ Booking confirmed! See you in Berlin.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const handleStartOver = () => {
    dispatch({ type: START_OVER });
    navigate("/");
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: SET_TOUCHED, field: e.target.name });
  };

  const displayNextButton = () => {
    if (state.disabled === true) {
      return (
        <>
          <Tooltip anchorSelect="#NextID">
            You have to fill First Name and last name !
          </Tooltip>
          <StepperButton
            handleButton={handleNextStep}
            label="Next"
            disabled={state.disabled}
            id="NextID"
          />
        </>
      );
    } else {
      return (
        <StepperButton
          handleButton={handleNextStep}
          label="Next"
          disabled={state.disabled}
          id="NextID"
        />
      );
    }
  };

  return (
    <PageWrapper>
      {state.submitted ? (
        <ConfirmationScreen
          attendee={state.attendee}
          events={state.events}
          addons={state.addons}
          selection={state.selection}
          order={state.order}
          totalPrice={state.totalPrice}
          bookingId={state.bookingId}
          handleStartOver={handleStartOver}
        />
      ) : (
        <>
          <ProgressBar step={state.currentStep} />
          <RequiredFieldsNote>
            Fields with <RequiredStar>*</RequiredStar> are mandatory
          </RequiredFieldsNote>
          <StepContent>
            {state.currentStep === 1 && (
              <PersonalInfoStep
                attendee={state.attendee}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
                touched={state.touched}
                errors={state.errors}
              />
            )}
            {state.currentStep === 2 && (
              <ContactStep
                attendee={state.attendee}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
                touched={state.touched}
                errors={state.errors}
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
                handleBlur={handleBlur}
                touched={state.touched}
                errors={state.errors}
              />
            )}
          </StepContent>

          <Actions>
            {state.currentStep !== 1 && (
              <StepperButton
                handleButton={handlePrevStep}
                label="Previous"
                variant="outline"
              />
            )}

            {state.currentStep === 4 ? (
              <>
                <StepperButton
                  handleButton={handleOpenModal}
                  disabled={state.disabled}
                  label="Checkout"
                />
                {isModalOpen && (
                  <CheckoutModal isOpen={isModalOpen}>
                    <BookingSummary
                      attendee={state.attendee}
                      events={state.events}
                      addons={state.addons}
                      selection={state.selection}
                      order={state.order}
                      handleValidate={handleConfirmBooking}
                      handleClose={handleCloseModal}
                    />
                  </CheckoutModal>
                )}
              </>
            ) : (
              displayNextButton()
            )}
          </Actions>
        </>
      )}
    </PageWrapper>
  );
};
