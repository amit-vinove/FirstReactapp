import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Card, Button } from "react-bootstrap";
import multistepFormCss from "../css/multistepForm.css";
import * as yup from "yup";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function MultistepForm() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = (FormData) => {
    console.log("Form Submitted", FormData);
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <BasicForm next={handleNextStep} data={data} />,
    <EduForm next={handleNextStep} prev={handlePrevStep} data={data} />,
    <CommunicationForm
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
    />,
    <CompleteDetails data={data} />,
  ];

  return (
    <>
      <div className="col-md-6 formDiv">
        <h4
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Registration Form
        </h4>
        {steps[currentStep]}
      </div>
    </>
  );
}

const BasicFormValidationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const BasicForm = (props) => {
  const handleSubmit = (values) => {
    console.log(values);
    props.next(values);
  };

  return (
    <Card style={{ padding: "10px" }}>
      <Card.Body>
        <Formik initialValues={props.data} onSubmit={handleSubmit}>
          {(formikProps) => (
            <Form>
              <h4 style={{ marginBottom: "15px" }}>Basic Details</h4>
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">First Name</label>
                  <Field name="firstName" type="text" className="col" />
                </div>
                <ErrorMessage name="first_name" />
                <div className="col">
                  <label className="form-label">Last Name</label>
                  <Field name="lastName" type="text" className="col" />
                  <ErrorMessage name="last_name" />
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">Email</label>
                  <Field name="email" type="text" className="col" />
                </div>
                <div className="col">
                  <label className="form-label">Phone</label>
                  <Field name="phone" type="text" className="col" />
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">Gender</label> <br />
                  <Field name="gender" as="select" className="col">
                    <option value="select">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Field>
                </div>
                <div className="col">
                  <label className="form-label">Date of Birth</label>
                  <Field name="dob" type="date" className="col" />
                </div>
              </div>
              <Button className="nxtBtn" type="submit">
                Next Section
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

const EduForm = (props) => {
  const handleSubmit = (values) => {
    console.log(values);
    props.next(values, false);
  };
  const educationOptionsDB = [
    { name: "10th", value: "Tenth", check: true },
    { name: "12th", value: "Twelfth", check: true },
    { name: "Graduation", value: "Graduation", check: true },
    { name: "Post Graduation", value: "PostGraduation", check: true },
  ];
  const arr = [];
  // const [educationOptions, setEducationOptions] = useState(educationOptionsDB);
  let educationOptions = [...educationOptionsDB];

  const [educationList, setEducationList] = useState();
  return (
    <Card style={{ padding: "10px" }}>
      <Card.Body>
        <Formik
          initialValues={{
            ...props.data,
            educations: [{ id: Math.random().toString(16).substring(2, 6) }],
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <h4 style={{ marginBottom: "15px" }}>Educational Details</h4>
              <FieldArray name="educations">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  console.log(values);
                  const { educations } = values;

                  // const [educationList,setEducationList] = useState(educations)
                  const handleOnDragEnd = (result) => {
                    if (!result.destination) return;
                    const items = Array.from(educations);
                    const [reorderedItem] = items.splice(
                      result.source.index,
                      1
                    );
                    items.splice(result.destination.index, 0, reorderedItem);

                    setEducationList(items);
                  };

                  // const handleStatus = (e, index) => {
                  //   const selected = e.target.value;
                  //   console.log(selected);
                  //   const filtered  = educationOptionsDB.filter((edu) =>
                  //     edu.value !== Object.values(values.educations).map(({ name }) => name)
                  //   );
                  //   console.log(filtered)
                  //   educationOptions = [...filtered]
                  // };

                  const filterTwoArrays = (string1, string2) =>
                    string1.filter((item) => !string2.includes(item));

                  const finalArr = filterTwoArrays(
                    Object.values(educationOptions).map(({ value }) => value),
                    Object.values(values.educations).map(({ name }) => name)
                  );
                  console.log(finalArr);

                  return (
                    <div>
                      <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="characters">
                          {(provided) => (
                            <div
                              className="characters"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {educations.map(
                                ({ id, name, percentage }, index) => (
                                  
                                  <Draggable
                                    key={id}
                                    draggableId={id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        className="mb-3 row"
                                        key={id}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                      >
                                        <div className="col-md-4">
                                          <Field
                                            name={`educations[${index}].name`}
                                            as="select"
                                            className="col"
                                            // onChange={(e) => handleStatus(e)}
                                            //New solution - Creating New Array for every new Dropdown
                                          >
                                            <option>Select</option>
                                            {finalArr &&
                                              finalArr.map((data, index) => (
                                                <option
                                                  value={data}
                                                  key={index}
                                                >
                                                  {data}
                                                </option>
                                              ))} 
                                          </Field>
                                        </div>
                                        <div className="col-md-4">
                                          <Field
                                            name={`educations.${index}.percentage`}
                                            placeholder="Percentage"
                                            type="text"
                                            className="col"
                                          />
                                        </div>
                                        <div className="col-md-1">
                                          <Button
                                            type="button"
                                            variant="info"
                                            onClick={() =>
                                              push({
                                                id: Math.random()
                                                  .toString(16)
                                                  .substring(2, 6),
                                                name: "",
                                                percentage: "",
                                              })
                                            }
                                          >
                                            Add
                                          </Button>
                                        </div>
                                        <div className="col-md-1">
                                          <Button
                                            type="button"
                                            variant="dark"
                                            onClick={() => remove(index)}
                                          >
                                            Remove
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                )
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  );
                }}
              </FieldArray>

              <Button className="nxtBtn" type="submit">
                Next Section
              </Button>
              <Button
                className="prevBtn"
                type="button"
                variant="secondary"
                onClick={() => props.prev(values)}
              >
                Prev Section
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

const CommunicationForm = (props) => {
  const handleSubmit = (values) => {
    props.next(values, false);
  };
  return (
    <Card style={{ padding: "10px" }}>
      <Card.Body>
        <Formik initialValues={props.data} onSubmit={handleSubmit}>
          {({ values }) => (
            <Form>
              <h4 style={{ marginBottom: "15px" }}>Communication Details</h4>
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">House/Flat Details</label>
                  <Field name="house" type="text" className="col" />
                </div>
                <div className="col">
                  <label className="form-label">Street/Area Details</label>
                  <Field name="street" type="text" className="col" />
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">City</label>
                  <Field name="city" type="text" className="col" />
                </div>
                <div className="col">
                  <label className="form-label">State</label>
                  <Field name="state" type="text" className="col" />
                </div>
              </div>

              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">Country</label>
                  <Field name="country" type="text" className="col" />
                </div>
                <div className="col">
                  <label className="form-label">Pin Code</label>
                  <Field name="pinCode" type="text" className="col" />
                </div>
              </div>

              <Button className="nxtBtn" type="submit">
                Next Section
              </Button>
              <Button
                className="prevBtn"
                type="button"
                variant="secondary"
                onClick={() => props.prev(values)}
              >
                Prev Section
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

const CompleteDetails = (props) => {
  return (
    <Card style={{ padding: "10px" }}>
      <Card.Body>
        <Formik initialValues={props.data}>
          {({ values }) => (
            <Form>
              <h4 style={{ marginBottom: "15px" }}>Basic Details</h4>
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">First Name</label>
                  <h5>{props.data.firstName}</h5>
                </div>
                <div className="col">
                  <label className="form-label">Last Name</label>
                  <h5>{props.data.lastName}</h5>
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">Email</label>
                  <h5>{props.data.email}</h5>
                </div>
                <div className="col">
                  <label className="form-label">Phone</label>
                  <h5>{props.data.phone}</h5>
                </div>
              </div>

              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">Gender</label>
                  <h5>{props.data.gender}</h5>
                </div>
                <div className="col">
                  <label className="form-label">Date of Birth</label>
                  <h5>{props.data.dob}</h5>
                </div>
              </div>
              <hr />
              <h4 style={{ marginBottom: "15px" }}>Educational Details</h4>
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">10th Marks</label>
                  <h5>{props.data.educations[0].percentage}</h5>
                </div>
                <div className="col">
                  <label className="form-label">12th Marks</label>
                  <h5>{props.data.educations[1].percentage}</h5>
                </div>
              </div>

              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">Graduation Marks</label>
                  <h5>{props.data.educations[2].percentage}</h5>
                </div>
                <div className="col">
                  <label className="form-label">Post Graduation Marks</label>
                  <h5>{props.data.educations[3].percentage}</h5>
                </div>
              </div>
              <hr />
              <h4 style={{ marginBottom: "15px" }}>Communication Details</h4>
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">House/Flat</label>
                  <h5>{props.data.house}</h5>
                </div>
                <div className="col">
                  <label className="form-label">Street/Area</label>
                  <h5>{props.data.street}</h5>
                </div>
              </div>

              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">City</label>
                  <h5>{props.data.city}</h5>
                </div>
                <div className="col">
                  <label className="form-label">State</label>
                  <h5>{props.data.state}</h5>
                </div>
              </div>

              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">Country</label>
                  <h5>{props.data.city}</h5>
                </div>
                <div className="col">
                  <label className="form-label">Pin Code</label>
                  <h5>{props.data.pinCode}</h5>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default MultistepForm;
