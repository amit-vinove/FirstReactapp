import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../navBar/sidebar";
import TopBar from "../navBar/topBar";
import MultiSelectbar from "./multiSelectBar";

function AvatarPage() {
  const usernameDB = [
    "Amit Kumar",
    "Arun Sharma",
    "Vikas Kumar",
    "Manoj Singh",
    "Pradeep Verma",
    "Sarthak Sharma",
  ];
  const optionsDB = [
    { name: "Amit Kumar", isSelected: false },
    { name: "Arun Sharma", isSelected: false },
    { name: "Vikas Kumar", isSelected: false },
    { name: "Manoj Singh", isSelected: false },
    { name: "Pradeep Verma", isSelected: false },
    { name: "Sarthak Sharma", isSelected: false },
  ];

  const colorsDB = ["#0d46b7", "#d9004c", "#013220", "#ffc40c", "#008b8b"];

  return (
    <>
      <TopBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1 sideNav">
            <Sidebar />
          </div>
          <div className="col-md-11">
            {/* -------Multi Select Bar Page --------------- */}
            <div className="container" style={{ padding: "20px" }}>
              <h5 style={{ fontWeight: "400" }}>Multi Select Bar Page</h5>
              <div className="col-md-10" style={{marginTop:'20px'}}>
                <MultiSelectbar
                  colorsDB={colorsDB}
                  optionsDB={optionsDB}
                  borderColor = '#0d46b7'
                  tagColor='#dbd8d8'
                  tagTextColor='black'
                  tagHoverColor = '#3ba2ff'
                  tagHoverTextColor='white'
                  tagTextSize='20px'
                  tagCrossSize = '18px'
                  placeholder='Search Contacts...'
                  placeholderSize = '18px'
                  listTextSize = '21px'
                  listHoverColor = '#147fdc'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvatarPage;
