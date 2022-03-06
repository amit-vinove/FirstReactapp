import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import bgImg from "../images/vinoveBg.jpg";
import logo from "../images/logo.jpg";
import { Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const userDB={
    username:'Amitk6228',
    password:'Amit123'
  }
  let navigate = useNavigate(); 
  const [username , setUsername] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(username == userDB.username & password==userDB.password){
      console.log("Logged Successfully")
      console.log(username,password)
      let path = `/home`; 
      navigate(path);
    }
    else{
      console.log("Invalid User")
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9" style={{ marginLeft: "inherit" }}>
            <img src={bgImg} />
          </div>
          <div className="col-md-3">
            <img
              src={logo}
              style={{
                height: "100px",
                width: "200px",
                marginTop: "150px",
                marginLeft: "10px",
              }}
            />
            <form onSubmit={handleSubmit}>
              <div style={{ marginTop: "10%", padding: "5%" }}>
                <h3 className="mb-1">Login</h3>
                <p className="mb-4">Please enter your Username and Password</p>
                <InputGroup size="lg" className="mb-3">
                  <FormControl
                    aria-label="Large" onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    style={{ padding: "15px" }}
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
                <InputGroup size="lg" className="mb-3">
                  <FormControl type="password"
                    aria-label="Large" onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{ padding: "15px" }}
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
                <Button onSubmit={ (e) => {handleSubmit(e)}}
                  style={{ width: "150px", fontSize: "20px" }}
                  variant="primary"
                  type="submit"
                >
                  Login
                </Button>
                <h6 className="mt-3">Forgot Password ?</h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
