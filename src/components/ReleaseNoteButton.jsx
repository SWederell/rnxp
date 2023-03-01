import { ThemeContext } from "../contexts/ThemeContext";
const ReleaseNoteButton = ({ car, index, disabled, handleButtonClick }) => {
  // console.log(car)
  // console.log(index);
  const { buttonColours } = ThemeContext();

  const handleClick = () => {
    handleButtonClick(index);
    getBackgroundColour();
  };

  const getBackgroundColour = () => {
    if (disabled) {
      return buttonColours.disabled;
    }
    if (car.leftSite) {
      return buttonColours.complete;
    }
    return buttonColours.default;
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        width: "250px",
        margin: "5px",
        backgroundColor: getBackgroundColour(),
      }}
    >
      <p>REG: {car.reg}</p>
      <p>MAKE: {car.make}</p>
      <p>MODEL: {car.model}</p>
      <p>COLOUR: {car.colour}</p>
    </button>
  );
};

export default ReleaseNoteButton;
