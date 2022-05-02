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
} from "react-bootstrap-icons";

export default class todoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.todosDB.length < 1 ? (
          <Card style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Card.Body>
              <img
                src={defaultPost}
                style={{
                  height: "150px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              />
              <br />
              <p style={{ textAlign: "center" }}> There are no Tasks here </p>
            </Card.Body>
          </Card>
        ) : (
          this.props.todosDB.map((data) => (
            <Card
              style={{ marginTop: "20px", marginBottom: "20px" }}
              key={data.todoId}
            >
              <Card.Body>
                <div className="row">
                  <div className="col-md-10">
                    <h4>{data.todoName}</h4>
                  </div>
                  <div className="col-md-1">
                    <Button
                      style={{ float: "right" }}
                      variant="primary"
                      type="button"
                    >
                      <CheckSquareFill />
                    </Button>
                  </div>
                  <div className="col-md-1">
                    <Button
                      variant="danger"
                      type="button"
                      onClick={(e) => this.props.handleDelete(e, data.todoId)}
                    >
                      <TrashFill />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </>
    );
  }
}
