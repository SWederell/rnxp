import { v4 as uuidv4 } from "uuid";
import { Field, Formik, Form, FieldArray } from "formik";
import { FirebaseContext } from "../contexts/FirebaseContext";

const AddNote = ({ toggle }) => {
  const { addNewNote, user } = FirebaseContext();
  const initialValues = {
    authed: user.email,
    type: "driver",
    treg: "",
    id: uuidv4(),
    company: "XPAuto",
    name: "",
    time: "",
    cars: [
      {
        reg: "",
        make: "",
        model: "",
        colour: "",
        leftSite: false,
      },
    ],
  };

  const newCar = {
    reg: "",
    make: "",
    model: "",
    colour: "",
    leftSite: false,
  };

  return (
    <div style={Styles.addNoteContainer}>
      <p>Create Release Note For Today</p>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          addNewNote(values);
          toggle();
        }}
      >
        {({ handleChange, values, resetForm, isSubmitting }) => (
          <Form style={Styles.formContainer}>
            <div style={Styles.flexContainer}>
              <Field
                as="select"
                id="type"
                name="type"
                style={Styles.formControl}
                onChange={handleChange}
                value={values.type}
              >
                <option value="driver">Driver</option>
                <option value="transporter">Transporter</option>
              </Field>
              {values.type == "transporter" && (
                <div style={Styles.formControl}>
                  <Field
                    id="treg"
                    name="treg"
                    style={Styles.carControl}
                    type="text"
                    placeholder="Transporter Reg"
                    onChange={handleChange}
                    value={values.treg}
                  />
                </div>
              )}

              <Field
                id="name"
                name="name"
                onChange={handleChange}
                style={Styles.formControl}
                type="text"
                placeholder="Driver Name"
                value={values.name}
              />
              <Field
                id="company"
                name="company"
                onChange={handleChange}
                value={values.company}
                style={Styles.formControl}
                type="text"
                placeholder="Company"
              />
              <Field
                id="dateTime"
                type="time"
                name="time"
                value={values.time}
                onChange={handleChange}
                style={Styles.formControl}
              />
            </div>
            <FieldArray name="cars">
              {({ insert, remove, push }) => (
                <div>
                  {values.cars.length > 0 &&
                    values.cars.map((car, index) => (
                      <div
                        key={index}
                        style={{
                          margin: "5px",
                          border: "1px solid white",
                          borderRadius: "10px",
                          padding: "5px",
                        }}
                      >
                        <Field
                          key={`${index}.reg`}
                          style={Styles.carControl}
                          name={`cars.${index}.reg`}
                          type="text"
                          placeholder="Reg"
                        />
                        <Field
                          key={`${index}.make`}
                          style={Styles.carControl}
                          name={`cars.${index}.make`}
                          type="text"
                          placeholder="Manufacturer"
                        />
                        <Field
                          key={`${index}.model`}
                          style={Styles.carControl}
                          name={`cars.${index}.model`}
                          type="text"
                          placeholder="Model"
                        />
                        <Field
                          key={`${index}.colour`}
                          style={Styles.carControl}
                          name={`cars.${index}.colour`}
                          type="text"
                          placeholder="Colour"
                        />
                        {values.type === "transporter" && (
                          <div style={Styles.formButtons}>
                            <button
                              type="button"
                              style={Styles.carControl}
                              onClick={() => push(newCar)}
                            >
                              +
                            </button>
                            <button
                              type="button"
                              style={Styles.carControl}
                              onClick={() => remove(index)}
                              disabled={values.cars.length == 1}
                            >
                              -
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>
            <div style={Styles.formButtons2}>
              <button
                type="submit"
                style={Styles.carControl}
                disabled={isSubmitting}
              >
                Create Note
              </button>
              <button
                type="reset"
                onClick={resetForm}
                style={Styles.carControl}
              >
                Clear Form
              </button>
              <button
                type="reset"
                onClick={() => {
                  resetForm();
                  toggle();
                }}
                style={Styles.carControl}
              >
                Close
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const Styles = {
  addNoteContainer: {
    width: "90%",
    margin: "20px auto",
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
    width: "60%",
    maxWidth: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
  },
  carControl: {
    margin: "0 5px",
  },
  formButtons: { display: "inline-block", margin: "5px 0" },
  formButtons2: { display: "block", margin: "5px 0" },
};

export default AddNote;
