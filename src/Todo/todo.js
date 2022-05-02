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
import TodoList from "./todoList";
import { listTodos } from "../Redux/Actions/todosActions";
import { useDispatch, useSelector } from "react-redux";

class TodoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTodoValue: "",
      todos: [],
    };
  }
  username = localStorage.getItem("User");

  componentDidMount() {
    axios
      .get(
        `http://localhost:5032/api/Todo/GetTodoByUsername?username=${this.username}`
      )
      .then((res) => {
        console.log(res);
        this.setState({
          todos: [...this.state.todos, ...res.data],
        });
      });
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      addTodoValue: e.target.value,
    });
  };

  addNewTodo = (e, value) => {
    e.preventDefault();

    if (value) {
      let todoData = {
        todoId: 0,
        todoName: value,
        userId: 0,
        username: this.username,
      };
      axios
        .post("http://localhost:5032/api/Todo/AddTodo", todoData)
        .then((res) => {
          console.log(res);
          this.setState({
            ...this.state,
            todos: [...this.state.todos, res.data],
          });
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Please Add Todo");
    }
  };

  handleDelete = (e, todoId) => {
    console.log(todoId);
    axios
      .delete(`http://localhost:5032/api/Todo/DeleteTodo?todoId=${todoId}`)
      .then((res) => {
        console.log(res);
        let dataDB = [...this.state.todos];
        const filtered = dataDB.filter((item) => item.todoId !== todoId);
        this.setState({
          todos: [...filtered],
        });
      });
  };

  render() {
    console.log(this.todos);
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
                <h5 style={{ fontWeight: "400" }}>To-Do Tasks</h5>
                <Card style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Card.Body>
                    <Form>
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          placeholder="Add Your Tasks here..."
                          as="textarea"
                          rows={3}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        style={{
                          float: "right",
                          width: "120px",
                          fontSize: "16px",
                        }}
                        type="submit"
                        onClick={(e) =>
                          this.addNewTodo(e, this.state.addTodoValue)
                        }
                      >
                        <PlusSquare /> Add Todo
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>

                <TodoList
                  todosDB={this.state.todos}
                  handleDelete={this.handleDelete}
                />
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TodoPage;
