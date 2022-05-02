import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";
import navCss from "../css/nav.css";
import homeCss from "../css/home.css";
import Sidebar from "../navBar/sidebar";
import Card from "react-bootstrap/Card";
import inboxImg from "../images/inboxImg.svg";
import Select from "react-select";

function QuickAccess() {
  const date = new Date();
  let today = date.toDateString();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  const [time, setTime] = React.useState("");
  const [event, setEvent] = React.useState("");
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  // const optArray = ['10th','12th','UG','PG']
  // const [options,setOptions]=useState(['10th','12th','UG','PG']);

  const calenderURL = `https://calendarific.com/api/v2/holidays?&api_key=274e720acef9f69b5abf7149ab3ef69d54b4b764&country=IN&year=${year}&day=${day}&month=${month}`;

  useEffect(() => {
    axios.get(calenderURL).then((response) => {
      // console.log(response.data.response);
      let res = response.data.response;
      if (res.holidays.length > 0) {
        setEvent(response.data.response.holidays[0].name);
      } else {
        setEvent("No Holiday Today");
      }
    });
  }, []);

  React.useEffect(() => {
    const myInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <>
      <div className="container" style={{ padding: "20px" }}>
        <h5 style={{ fontWeight: "400" }}>Quick Access</h5>
        <Card style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Card.Body>
            <Card.Title style={{ fontSize: "15px", marginBottom: "20px" }}>
              Inbox{" "}
            </Card.Title>
            <div className="row ">
              <div className="col-md-4">
                <Card.Text style={{ fontSize: "15px" }}>
                  <img
                    src={inboxImg}
                    style={{ height: "70px", width: "110px" }}
                  />
                </Card.Text>
              </div>
              <div className="col-md-8">
                <Card.Text style={{ fontSize: "14px", marginTop: "20px" }}>
                  Good Job ! <br /> You Have no Pending Tasks
                </Card.Text>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "#307bc1",
            color: "white",
          }}
        >
          <Card.Body>
            <Card.Title style={{ fontSize: "15px" }}>Time Today </Card.Title>
            <Card.Title style={{ fontSize: "26px" }}> {today} </Card.Title>
            <Card.Title style={{ fontSize: "26px" }}> {time} </Card.Title>
          </Card.Body>
        </Card>

        <Card
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "#36a2b2",
            color: "white",
          }}
        >
          <Card.Body>
            <Card.Title style={{ fontSize: "15px" }}>Holidays</Card.Title>
            <Card.Title style={{ fontSize: "26px" }}> {event} </Card.Title>
            <Card.Title style={{ fontSize: "26px" }}> {today} </Card.Title>
          </Card.Body>
        </Card>
        {/* 
        <div className="col-md-6">
              <Form>
                <Form.Select aria-label="Default select example" onChange={(e)=>changeOptions(e.target.value)}>
                  <option>Open this select menu</option>

                  {options.map((ele,i)=>(
                    <option value={i}>{ele}</option>
                  ))}
                </Form.Select>
              </Form>
<br/>
<Form>
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>

                  {options.map((ele,i)=>(
                    <option value={ele}>{ele}</option>
                  ))}
                </Form.Select>
              </Form>
<br/>
<Form>
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>

                  {options.map((ele,i)=>(
                    <option value={i}>{ele}</option>
                  ))}
                </Form.Select>
              </Form> <br/> 
              <Form>
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>

                  {options.map((ele,i)=>(
                    <option value={i}>{ele}</option>
                  ))}
                </Form.Select>
              </Form>
              </div> */}

        <Select isMulti={true} options={options} />
        <Select options={options} />
        <Select options={options} />
      </div>
    </>
  );
}

export default QuickAccess;
