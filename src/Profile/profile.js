import React, { useEffect, useState } from "react";
import Sidebar from "../navBar/sidebar";
import Navbar from "../navBar/topBar";
import navCss from "../css/nav.css";
import indexCss from "../css/index.css";
import { Card , Button} from 'react-bootstrap'
import profileImg from '../images/2474247.jpg'
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { GetProfile } from "../Redux/Actions/todosActions";

function ProfilePage() {
  const loggedUsername = localStorage.getItem('User')
  const profileURL =  `http://localhost:5032/api/Employee/GetEmployeeByUsername?username=${loggedUsername}`
  const [profile , setProfile] = useState([])

  useEffect(()=>{
    axios.get(profileURL).then((response)=>{
      setProfile(response.data)
    })
  },[])

  const dispatch =useDispatch();
  //single-way api-calling using redux
  const profileDB = useSelector(
    (state) => state.rootReducer.profileInfo
  );

  useEffect(() => {
    dispatch(GetProfile(loggedUsername));
   }, [])

console.log(profileDB)
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1 sideNav">
            <Sidebar />
          </div>
          <div className="col-md-11">
            <br/>
            <div>
              <Card >
                <div className="row">
                <div className="col-md-2">
                <img src="https://img.icons8.com/bubbles/160/000000/user.png" style={{height:'220px',width:'250px',marginRight:'10px'}}/>

                </div>
                <div className="col-md-10">
                <Card.Body>
                    <h2 style={{fontWeight : '400'}}>{profile.employeeFirstName} {profile.employeeLastName}</h2>
                    <div className="row">
                      <div className="col-md-1"><img src="https://img.icons8.com/material-rounded/48/000000/marker.png" style={{height:'20px',width:'20px'}}/>{profile.location}</div>
                      <div className="col-md-3"><p style={{textAlign:'center'}}><img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-email-interface-kiranshastry-lineal-kiranshastry-1.png"
                       style={{height:'20px',width:'20px'}}/>{profile.email}</p> </div>
                      <div className="col-md-2"><p><img src="https://img.icons8.com/ios-glyphs/30/000000/phone--v1.png" 
                      style={{height:'20px',width:'20px'}}/>{profile.phone}</p> </div>
                    </div>
                    <hr/>
                    <div className="row">
                      <div className="col-md-2"><label style={{fontSize:'12px'}}>Job Title</label></div>
                      <div className="col-md-1"><label style={{fontSize:'12px'}}>Department</label></div>
                      <div className="col-md-1"><label style={{fontSize:'12px'}}>Business Unit</label></div>
                      <div className="col-md-1"><label style={{fontSize:'12px'}}>Reporting To</label></div>
                      <div className="col-md-1"><label style={{fontSize:'12px'}}>EMP No</label></div>
                    </div>
                    <div className="row">
                      <div className="col-md-2"><p style={{fontSize:'15px'}}>{profile.designation}</p></div>
                      <div className="col-md-1"><p style={{fontSize:'15px'}}>{profile.employeeTeam}</p></div>
                      <div className="col-md-1"><p style={{fontSize:'15px'}}>Services</p></div>
                      <div className="col-md-1"><p style={{fontSize:'15px'}}>{profile.employeeManager}</p></div>
                      <div className="col-md-1"><p style={{fontSize:'15px'}}>{profile.employeeNumber}</p></div>
                      <div className="col-md-6"><Button style={{float:'right'}} variant="primary">Edit Details</Button></div>
                    </div>
                    <hr/>
                </Card.Body>
                </div>
                </div>
              </Card>
            </div>
            <br /> <br />
            <div className="col-md-8">
              <Card>
            <Card.Body>
            <div className="row">
              <div className="col-md-12">
                <div>
                  <h4 style={{ fontWeight: 500 }}> Primary Details </h4>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <label>First Name:</label>
                      <h5>{profile.employeeFirstName}</h5>
                    </div>
                    <div className="col">
                      <label>Last Name:</label>
                      <h5>{profile.employeeLastName}</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Gender:</label>
                      <h5>{profile.employeeGender}</h5>
                    </div>
                    <div className="col">
                      <label>Date of Birth:</label>
                      <h5>{profile.employeeDOB}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div>
              <h4 style={{ fontWeight: 500 }}> Contact Details </h4>
              <hr />
              <div className="row">
                <div className="col">
                  <label>Email:</label>
                  <h5>{profile.email}</h5>
                </div>
                <div className="col">
                  <label>Phone:</label>
                  <h5>{profile.phone}</h5>
                </div>
              </div>
            </div>
            <br />
            <div>
              <h4 style={{ fontWeight: 500 }}> Address Details </h4>
              <hr />
              <div className="row">
                <div className="col">
                  <label>Permanent Address:</label>
                  <br />
                  <h5>{profile.permanentAddress}</h5>
                </div>
                <div className="col">
                  <label>Current Address:</label>
                  <br />
                  <h5>{profile.currentAddress}</h5>
                </div>
              </div>
            </div>
            <br />
            <div>
              <h4 style={{ fontWeight: 500 }}>About </h4>
              <hr />
              <div className="row">
                <div className="col">
                  <h5>{profile.about}</h5>
                </div>
              </div>
            </div>
            </Card.Body>
            </Card>
          </div>
          <br/><br/>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfilePage;
