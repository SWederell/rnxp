import React from "react";
import { v4 as uuid4 } from "uuid";

const AddCarForm = ({
  removeFormCarData,
  index,
  addNewCar,
  updateFormCarData,
  car,
}) => {
  return (
    <div>
      <input
        key={uuid4()}
        style={Styles.carControl}
        onChange={(e) => {
          updateFormCarData(index, { reg: e.target.value });
        }}
        type="text"
        placeholder="Reg"
        value={car.reg}
      />
      <input
        key={uuid4()}
        style={Styles.carControl}
        onChange={(e) => {
          updateFormCarData(index, { make: e.target.value });
        }}
        type="text"
        placeholder="Manufacturer"
        value={car.make}
      />
      <input
        key={uuid4()}
        style={Styles.carControl}
        onChange={(e) => {
          updateFormCarData(e, index, { colour: e.target.value });
        }}
        type="text"
        placeholder="Colour"
        value={car.colour}
      />
      <button style={Styles.carControl} onClick={(e) => addNewCar(e)}>
        +
      </button>
      <button
        style={Styles.carControl}
        onClick={(e) => removeFormCarData(e, index)}
      >
        -
      </button>
    </div>
  );
};

const Styles = {
  carControl: {
    margin: "0 5px",
  },
};

export default AddCarForm;
