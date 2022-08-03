import React from "react";
import { useState } from "react";
import CalenderCss from "../css/calender.css";
import moment from "moment";
import { Button, ButtonGroup } from "react-bootstrap";
import { ChevronRight,ChevronLeft } from "react-bootstrap-icons";

function Calender(){

  const [month,setMonth] = useState(moment());

  const year = new Date().getFullYear();

  const getDate = (month) => {
    var calender = [];

    const startDate = moment([year, month])
      .clone()
      .startOf("month")
      .startOf("week");

    const endDate = moment([year, month]).clone().endOf("month");

    const day = startDate.clone().subtract(1, "day");

    while (day.isBefore(endDate, "day")) {
      calender.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }

      function beforeToday(day) {
        return day.isBefore(moment([year,month]).clone().startOf("month"), "day")
      }
    
      function endOfMonth(day) {
        return day.isAfter(endDate, "day")
      }
      function dayStyles(day) {
        if (beforeToday(day)) return "before"
        if (day.isSame(moment(), 'day')) return "todayDt"
        if (endOfMonth(day)) return "before"
        return "dtText"}
    

    if (calender.length > 0) {
      return calender.map((week) => (
        <div className="datesDiv" key={Math.random()}>
          {week.map((day) => (
            <div className="dates" key={Math.random()}>
              <h5 className={dayStyles(day)}>{day.format('DD')}</h5>
            </div>
          ))}
        </div>
      ));
    }
  };

  const prevMonth =(e)=>{
    var changedMonth = month.clone().subtract(1, 'months')
    setMonth(changedMonth)
  }
  const currMonth =(e)=>{
    var changedMonth = moment()
    setMonth(changedMonth)
  }
  const nextMonth =(e)=>{
    var changedMonth = month.clone().add(1, 'months')
    setMonth(changedMonth)
  }

  return (
    <>
      <div className="container mb-4">
        <h5 style={{ textAlign: "center" }}>Calender</h5>
      </div>

        <div className="col-md-6 calenderDiv">
          <div className="calenderHead">
            <h2>{month.format('MMMM')} <span style={{'fontWeight':'300'}}>{month.format('YYYY')}</span></h2>
            <div className="mthButton">
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" className="left" onClick={(e)=>prevMonth(e)}><ChevronLeft/></Button>
                <Button variant="secondary" className="todayMth" onClick={(e)=>currMonth(e)}>Today</Button>
                <Button variant="secondary" className="right" onClick={(e)=>nextMonth(e)}><ChevronRight/></Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="daysDiv">
            <h6>Sun</h6>
            <h6>Mon</h6>
            <h6>Tue</h6>
            <h6>Wed</h6>
            <h6>Thu</h6>
            <h6>Fri</h6>
            <h6>Sat</h6>
          </div>
          <hr className="hr" />
          {getDate(month.format('M')-1)}
        </div>

    </>
  );
};

export default Calender;
