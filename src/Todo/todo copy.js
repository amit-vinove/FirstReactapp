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

function TodoPage() {
  const [todo, setTodos] = useState("");
  const [todosDB, setTodosDB] = useState([]);
  const [style, setTodoStyle] = useState("todoStyle");

  const handleSubmit = (e) => {
    const username = localStorage.getItem("User");
    e.preventDefault();
    let todoData = {
      todoId: 0,
      todoName: todo,
      userId: 0,
      username: username,
    };
    axios
      .post("http://localhost:5032/api/Todo/AddTodo", todoData)
      .then((res) => {
        const data = res;
        console.log(data);
        e.preventDefault();
        let obj = [...todosDB];
        obj.push(res.data);
        setTodosDB(obj);
        e.target.reset();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const username = localStorage.getItem("User");
    axios
      .get(
        `http://localhost:5032/api/Todo/GetTodoByUsername?username=${username}`
      )
      .then((response) => {
        setTodosDB(response.data);
      });
  }, []);
  console.log(todosDB);

  const handleDelete = (todoId) => {
    axios
      .delete(`http://localhost:5032/api/Todo/DeleteTodo?todoId=${todoId}`)
      .then((response) => {
        console.log(response);
        let dataDB = [...todosDB];
        const filtered = dataDB.filter((item) => item.todoId !== todoId);
        setTodosDB(filtered);
        // console.log(filtered)
      });
  };

  const todoChecked = (todoId, checked) => {
    if (checked == true) {
      var check = false;
    } else {
      check = true;
    }
    axios
      .put(
        `http://localhost:5032/api/Todo/CheckTodo?checkTodo=${check}&todoId=${todoId}`
      )
      .then((response) => {
        var todos = response.data.data;
        setTodosDB(todos);
        //  console.log(todos)
      });
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
              <h5 style={{ fontWeight: "400" }}>To-Do Tasks</h5>
              <Card style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      className="mb-1"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        onChange={(e) => {
                          setTodos(e.target.value);
                        }}
                        placeholder="Add Your Tasks here..."
                        as="textarea"
                        rows={3}
                      />
                    </Form.Group>
                    <Button
                      onSubmit={handleSubmit}
                      variant="primary"
                      style={{
                        float: "right",
                        width: "120px",
                        fontSize: "16px",
                      }}
                      type="submit"
                    >
                      <PlusSquare /> Add Todo
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              {todosDB.length < 1 ? (
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
                    <p style={{ textAlign: "center" }}>
                      {" "}
                      There are no Tasks here{" "}
                    </p>
                  </Card.Body>
                </Card>
              ) : (
                todosDB.map((data) => (
                  <Card
                    key={data.todoId}
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                  >
                    <Card.Body>
                      <div className="row">
                        <div className="col-md-10">
                          <h4
                            className={
                              data.checked ? "todoStyleChecked" : style
                            }
                          >
                            {" "}
                            {data.todoName}{" "}
                          </h4>
                        </div>
                        <div className="col-md-1">
                          <Button
                            style={{ float: "right" }}
                            variant="primary"
                            type="button"
                            onClick={() =>
                              todoChecked(data.todoId, data.checked)
                            }
                          >
                            <CheckSquareFill />
                          </Button>
                        </div>
                        <div className="col-md-1">
                          <Button
                            onClick={() => handleDelete(data.todoId)}
                            variant="danger"
                            type="button"
                          >
                            <TrashFill />
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoPage;
