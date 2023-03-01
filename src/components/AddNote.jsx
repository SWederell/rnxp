import { useState } from "react";
import AddCarForm from "./AddCarForm";
import { v4 as uuid4 } from "uuid";

const AddNote = () => {
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    reg: "",
    company: "",
    name: "",
    time: "",
  });
  const [carData, setCarData] = useState([
    {
      reg: "",
      make: "",
      colour: "",
      leftSite: false,
    },
  ]);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const addNewCar = (e) => {
    e.preventDefault();
    const newCar = {
      reg: "",
      make: "",
      colour: "",
      leftSite: false,
    };
    setCarData((prev) => {
      return [...prev, newCar];
    });
  };

  const updateFormCarData = (e, index, newData) => {
    e.preventDefault();
    console.log(index, newData);
    setCarData((prev) => {
      const updatedCar = { ...prev[index], ...newData };
      const newCars = [...prev];
      newCars[index] = updatedCar;
      return newCars;
    });
  };

  const removeFormCarData = (e, index) => {
    e.preventDefault();
    setCarData((prev) => {
      const oldCars = [...prev];
      console.log(index);
      const preIndex = oldCars.slice(0, index);
      console.log(preIndex);
      const postIndex = oldCars.slice(index + 1);
      console.log(postIndex);
      return [...preIndex, ...postIndex];
    });
  };

  console.log(carData);

  return (
    <div style={Styles.addNoteContainer}>
      {addNoteOpen ? (
        <div style={Styles.noteFlexContainer}>
          <div
            style={Styles.containerClose}
            onClick={() => {
              setAddNoteOpen(false);
            }}
          >
            - close -
          </div>
          <form style={Styles.formContainer}>
            <div style={Styles.flexContainer}>
              <select
                style={Styles.formControl}
                onChange={(e) => {
                  updateFormData({ type: e.target.value });
                }}
              >
                <option value="driver">Driver</option>
                <option value="transporter">Transporter</option>
              </select>
              {formData.type == "transporter" && (
                <div>
                  <input
                    style={Styles.carControl}
                    type="text"
                    placeholder="Transporter Reg"
                  />
                  <input
                    style={Styles.carControl}
                    type="text"
                    placeholder="Company"
                  />
                </div>
              )}

              <input
                style={Styles.formControl}
                type="text"
                placeholder="Driver Name"
              />
            </div>
            {carData.map((car, index) => {
              return (
                <AddCarForm
                  car={car}
                  key={uuid4()}
                  index={index}
                  addNewCar={addNewCar}
                  updateFormCarData={updateFormCarData}
                  removeFormCarData={removeFormCarData}
                />
              );
            })}
            <div>
              <button style={Styles.carControl}>Create Note</button>
              <button style={Styles.carControl}>Clear Form</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <button onClick={() => setAddNoteOpen(true)}>Add Release Note</button>
        </div>
      )}
    </div>
  );
};

const Styles = {
  addNoteContainer: {
    width: "90%",
    marginTop: "20px",
  },
  noteFlexContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  containerClose: { width: "100%", userSelect: "none" },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContents: "center",
  },
  formControl: {
    width: "300px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
  },
  carControl: {
    margin: "0 5px",
  },
};

export default AddNote;
