import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";
import navCss from "../css/nav.css";
import homeCss from "../css/home.css";
import Sidebar from "../navBar/sidebar";
import Card from "react-bootstrap/Card";
import defaultPost from "../images/defaultPost.svg";
import TopBar from "../navBar/topBar";
import {
  PlusSquare,
  Trash,
  TrashFill,
  PencilSquare,
  CheckSquareFill,
  Search,
} from "react-bootstrap-icons";

function AvatarPage() {
  const usernameDB = [
    "Amit Kumar",
    "Arun Sharma",
    "Vikas Kumar",
    "Manoj Singh",
    "Pradeep Verma",
    "Sarthak Sharma",
  ];

  const [username, setUsername] = useState(usernameDB);

  const search = (e) => {
    const result = [...usernameDB].filter((name) =>
      name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsername(result);
  };

  const initials = (username) => {
    return username
      .match(/(\b\S)?/g)
      .join("")
      .match(/(^\S|\S$)?/g)
      .join("")
      .toUpperCase();
  };

  const optionsDB = [
    { name: "Amit Kumar", isSelected: true },
    { name: "Arun Sharma", isSelected: false },
    { name: "Vikas Kumar", isSelected: false },
    { name: "Manoj Singh", isSelected: false },
    { name: "Pradeep Verma", isSelected: false },
    { name: "Sarthak Sharma", isSelected: false },
  ];
  const[option,setOptions] = useState(optionsDB)

  const Select = (e,name) => {
    console.log(name)
    setOptions(
    option.map((ele)=>
    (ele.name === name ? { ...ele, isSelected: true } : ele)))
    
  };
  return (
    <>
      <TopBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1 sideNav">
            <Sidebar />
          </div>
          <div className="col-md-11">
            <div className="container" style={{ padding: "20px" }}>
              <h5 style={{ fontWeight: "400" }}>Avatar Bar Page</h5>
              <Card style={{ marginTop: "20px" }}>
                <Card.Body>
                  <Form>
                    <div className="row">
                      <div className="col-md-10">
                        <Form.Group
                          className="mb-1"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Control
                            onChange={(e) => search(e)}
                            placeholder="Search here..."
                            as="textarea"
                            rows={1}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-md-2">
                        <Button
                          variant="primary"
                          style={{
                            float: "left",
                            width: "120px",
                            fontSize: "16px",
                          }}
                          type="submit"
                        >
                          <Search /> search
                        </Button>
                      </div>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              <div className="col-md-10">
                <Card style={{ marginBottom: "20px", marginTop: "5px" }}>
                  <Card.Body style={{ padding: "8px" }}>
                    {username.map((data) => (
                      <div key={Math.random()}>
                        <div className="col-md-6" style={{ display: "flex" }}>
                          <h4 className="av">{initials(data)}</h4>
                          <h4 style={{ marginLeft: "10px", lineHeight: "1.6" }}>
                            {data}
                          </h4>
                        </div>
                        <hr style={{ margin: "revert" }} />
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className="container" style={{ padding: "20px" }}>
              <h5 style={{ fontWeight: "400" }}>Multi Select Bar Page</h5>
              <Card style={{ marginTop: "20px" }}>
                <Card.Body>
                  <Form>
                    <div className="row">
                      <div className="col-md-10" style={{display:'flex'}}>
                        {option.map((data) => (
                          <div key={Math.random()}>
                            {data.isSelected && (
                              <div className="tag">
                              <h4
                              >
                                {data.name}
                              </h4>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="col-md-2">
                        <Button
                          variant="primary"
                          style={{
                            float: "left",
                            width: "120px",
                            fontSize: "16px",
                          }}
                          type="submit"
                        >
                          <Search /> search
                        </Button>
                      </div>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              <div className="col-md-10">
                <Card style={{ marginBottom: "20px", marginTop: "5px" }}>
                  <Card.Body style={{ padding: "8px" }}>
                    {option.map((data) => (
                      <div key={Math.random()}>
                        {!data.isSelected && (
                          <div
                            className="col-md-12 select"
                            onClick={(e) => Select(e,data.name)}
                          >
                            <>
                              <h4
                                style={{
                                  marginLeft: "10px",
                                  lineHeight: "1.6",
                                }}
                              >
                                <h4 className="av">{initials(data.name)}</h4>
                              </h4>
                              <h4
                                style={{
                                  marginLeft: "10px",
                                  lineHeight: "1.6",
                                }}
                              >
                                {data.name}
                              </h4>
                            </>
                          </div>
                          // <hr style={{ margin: "revert" }} />
                        )}
                                                <hr style={{ margin: "revert" }} />
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvatarPage;
