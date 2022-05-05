import React, { useState, useEffect, useRef } from "react";
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
  XCircleFill,
  Search,
  CaretDownFill,
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

  const colors = ["#0d46b7", "#d9004c", "#013220", "#ffc40c", "#008b8b"];

  const [username, setUsername] = useState(usernameDB);
  const [inputVisible, setInputVisible] = useState(true);
  const [selectVisible, setSelectVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [text,setText]=useState("");
 

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
    { name: "Amit Kumar", isSelected: false },
    { name: "Arun Sharma", isSelected: false },
    { name: "Vikas Kumar", isSelected: false },
    { name: "Manoj Singh", isSelected: false },
    { name: "Pradeep Verma", isSelected: false },
    { name: "Sarthak Sharma", isSelected: false },
  ];
  const [option, setOptions] = useState(optionsDB);

  const Select = (e, name) => {
    console.log(name);
    setOptions(
      option.map((ele) =>
        ele.name === name ? { ...ele, isSelected: true } : ele
      )
    );
  };

  const searchOptions = (e) => {
    const result = [...optionsDB].filter((ele) =>
      ele.name.toLowerCase().includes(e.toLowerCase())
    );
    setOptions(result);
  };

  // console.log(option.filter((data) => data.isSelected == true));
  // console.log(input.current.focus)
  const remove = (e, name) => {
    setOptions(
      option.map((ele) =>
        ele.name === name ? { ...ele, isSelected: false } : ele
      )
    );
  };

  const ClearSelected = (e) => {
    setOptions(
      option.map((ele) =>
        ele.isSelected == true ? { ...ele, isSelected: false } : ele
      )
    );
  };

  const handleStyle=(e)=>{
    setInputVisible(false)
    setSelectVisible(true)
  }
 
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
                      <div className="col-md-10" style={{ display: "flex" }}>
                        <Search
                          style={{
                            marginTop: "11px",
                            zIndex: "1",
                            position: "absolute",
                            marginLeft: "10px",
                          }}
                        />
                        <Form.Control
                          onChange={(e) => search(e)}
                          placeholder="Search here..."
                          type="text"
                          rows={1}
                          style={{ paddingLeft: "28px" }}
                        />
                      </div>
                      <div className="col-md-2">
                        <Button
                          variant="primary"
                          style={{
                            float: "left",
                            width: "120px",
                            fontSize: "16px",
                          }}
                          type="button"
                        >
                          <Search /> search
                        </Button>
                      </div>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              <div className="col-md-10">
                  <Card className="selectDropdown">
                    <Card.Body style={{ padding: "8px" }}>
                      {username.map((data, i) => (
                        <div key={Math.random()}>
                          <div
                            className="col-md-12 select"
                            style={{ display: "flex" }}
                            onClick={(e)=>handleStyle(e)}
                          >
                            <h5
                              className="av"
                              style={{ background: `${colors[i % 5]}` }}
                            >
                              {initials(data)}
                            </h5>
                            <h5 className="avText">{data}</h5>
                          </div>
                          <hr
                            style={{ marginTop: "1px", marginBottom: "5px" }}
                          />
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
              </div>
            </div>


{/* -------Multi Select Bar Page --------------- */}
            <div className="container" style={{ padding: "20px" }}>
              <h5 style={{ fontWeight: "400" }}>Multi Select Bar Page</h5>
              <div className="col-md-10">
                <Card
                  style={{ marginTop: "20px", border: "1px solid #0d46b7" }}
                  onClick={(e) =>setDropdownVisible(true)
                  }
                >
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-11">
                        <div style={{ display: "flex" }}>
                          {option.map((data) => (
                            <div key={Math.random()}>
                              {data.isSelected && (
                                <div className="tag">
                                  <h5 style={{ color: "white" }}>
                                    {data.name}

                                    <XCircleFill
                                      type="button"
                                      onClick={(e) => remove(e, data.name)}
                                      style={{
                                        marginLeft: "10px",
                                        fontSize: "18px",
                                      }}
                                    />
                                  </h5>
                                </div>
                              )} 
                            </div>
                          ))}
                          <h6 contenteditable='true' style={{outline:'0px'}} data-text ="Search Here"  onInput={(e)=>{searchOptions(e.currentTarget.textContent)}}></h6>
                        </div>
                      </div>
                      <div className="col-md-1">
                        <CaretDownFill
                          type="button"
                          style={{
                            fontSize: "23px",
                            float: "right",
                            color: "dimgray",
                          }}
                          onClick={(e) =>
                            !dropdownVisible
                              ? setDropdownVisible(true)
                              : setDropdownVisible(false)
                          }
                        />
                        <span
                          style={{
                            float: "right",
                            marginLeft: "7px",
                            marginRight: "4px",
                          }}
                        >
                          |
                        </span>
                        <XCircleFill
                          type="button"
                          style={{
                            fontSize: "18px",
                            float: "right",
                            marginTop: "3px",
                            color: "dimgray",
                          }}
                          onClick={(e) => ClearSelected(e)}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              {dropdownVisible && (
                <div className="col-md-10">
                  <Card className="selectDropdown">
                    <Card.Body style={{ padding: "8px" }}>
                      {option.map((data, i) => (
                        <div key={Math.random()}>
                          {!data.isSelected && (
                            <div
                              className="col-md-12 "
                              onClick={(e) => Select(e, data.name)}
                            >
                              <div className="select">
                                <h5
                                  style={{ background: `${colors[i % 5]}` }}
                                  className="av"
                                >
                                  {initials(data.name)}
                                </h5>
                                <h5 className="avText">{data.name}</h5>
                              </div>
                              <hr
                                style={{
                                  marginTop: "1px",
                                  marginBottom: "5px",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </div>
              )}
            </div>



          </div>
        </div>
      </div>
    </>
  );
}

export default AvatarPage;
