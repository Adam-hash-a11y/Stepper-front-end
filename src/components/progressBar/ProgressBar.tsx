interface Props {
  step: number;
}

export const ProgressBar: React.FunctionComponent<Props> = ({ step }) => {
  return (
    <>
      {step >= 1 ? (
        <p style={{ backgroundColor: "green" }}>1 :Pesonal Info</p>
      ) : (
        <p>1 :Pesonal Info</p>
      )}

      {step >= 2 ? (
        <p style={{ backgroundColor: "green" }}>2 :Contact</p>
      ) : (
        <p>2 :Contact</p>
      )}
      {step >= 3 ? (
        <p style={{ backgroundColor: "green" }}>3 :Event Tier</p>
      ) : (
        <p>3 :Event Tier</p>
      )}
      {step >= 4 ? (
        <p style={{ backgroundColor: "green" }}>4 :Order</p>
      ) : (
        <p>4 :Order</p>
      )}
    </>
  );
};
