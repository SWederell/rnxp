import { ThemeContext } from "../contexts/ThemeContext";
const ReleaseNoteTile = ({ car, index, disabled, handleButtonClick }) => {
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
    <div
      style={{
        borderRadius: "10px",
        width: "250px",
        margin: "5px auto",
        padding: "10px",
        backgroundColor: getBackgroundColour(),
      }}
    >
      <p>REG: {car.reg}</p>
      <p>MAKE: {car.make}</p>
      <p>MODEL: {car.model}</p>
      <p>COLOUR: {car.colour}</p>
    </div>
  );
};

export default ReleaseNoteTile;
