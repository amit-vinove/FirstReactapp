import React, { useEffect, useState } from "react";
import Sidebar from "../navBar/sidebar";
import Navbar from "../navBar/topBar";
import navCss from "../css/nav.css";
import indexCss from "../css/index.css";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import axios from "axios";

function TeamsPage() {
  const loggedUsername = localStorage.getItem("User");
  const employeeURL = `http://localhost:5032/api/Employee/GetEmployeeTeamByUsername?username=${loggedUsername}`;
  const [empDB, setEmpDB] = useState([]);
  const [searchvalues, setSearchvalues] = useState([]);

  useEffect(() => {
    async function TeamsAPI() {
      await axios.get(employeeURL).then((response) => {
        setEmpDB(response.data);
        setSearchvalues(response.data);
        console.log(response.data);
      });
    }
    TeamsAPI()
  }, []);

  console.log(empDB)

  const search = (e) => {
    const result = [...empDB].filter((emp) =>
      emp.employeeName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchvalues(result);
    console.log(searchvalues);
  }; 

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1 sideNav">
            <Sidebar />
          </div>
          <div className="col-md-11">
            <h2
              style={{
                fontWeight: "400",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              My Peers ({empDB?.length})
            </h2>
            <Card>
              <Card.Body>
                <div className="row">
                  <div className="col-md-1" style={{ lineHeight: "35px" }}>
                  {empDB[0]?.employeeTeam} 
                  </div>
                  <div className="col-md-1" style={{ lineHeight: "35px" }}>
                    Location
                  </div>
                  <div className="col-md-10">
                    <InputGroup size="lg">
                      <FormControl
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={(e) => search(e)}
                        placeholder="Search Employee"
                      />
                    </InputGroup>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <br />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
              }}
              className="col-md-12"
            >
              {searchvalues.map((data, index) => (
                <Card className="empCard" key={index}>
                  <Card.Body>
                    <div style={{ display: "flex" }}>
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        style={{
                          height: "150px",
                          width: "150px",
                          marginRight: "10px",
                        }}
                      />
                      <Card.Text>
                        <h3>
                          {data.employeeFirstName} {data.employeeLastName}
                        </h3>
                        <p style={{ fontSize: "16px" }}>{data.designation}</p>
                        <p>Department : {data.employeeTeam}</p>
                        <p>Location : {data.location}</p>
                        <p>Email : {data.email}</p>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamsPage;
