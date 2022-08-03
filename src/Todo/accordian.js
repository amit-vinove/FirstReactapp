import React from "react";
import { useState } from "react";
import AccCSS from "../css/accordian.css";

function Accordian() {
  const AccData = [
    {
      id: 1,
      title: "Section 1",
      data: "Help others make informed decisions. Post a review of your employer (or a prior employer) and let future job applicants know what you like and dont like",
    },
    {
      id: 2,
      title: "Section 2",
      data: "Help others make informed decisions. Post a review of your employer (or a prior employer) and let future job applicants know what you like and dont like",
    },
    {
      id: 3,
      title: "Section 3",
      data: "Help others make informed decisions. Post a review of your employer (or a prior employer) and let future job applicants know what you like and dont like",
    },
  ];

  const [accArray, setAccArray] = useState([]);

  const handleAcc = (e, id) => {
    if (accArray.includes(id)) {
      const filtered = accArray.filter((item) => item !== id);
      setAccArray([...filtered]);
    } else {
      setAccArray([...accArray, id]);
    }
  };
  return (
    <>
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <h3 style={{ textAlign: "center" }}>React Accordian</h3>
      </div>
      {AccData.map((data) => (
        <div className="col-md-4 accDiv" key={data.id}>
          <div className="accHead" onClick={(e) => handleAcc(e, data.id)}>
            <h5>{data.title}</h5>{" "}
            <span
              style={{ float: "right", fontSize: "35px", lineHeight: "0.6" }}
            >
              +
            </span>
          </div>
          <div
            className={accArray.includes(data.id) ? "accBodyShow" : "accBody"}
          >
            <h6 style={{ textAlign: "justify", padding: "10px" }}>
              {data.data}
            </h6>
          </div>
        </div>
      ))}
    </>
  );
}

export default Accordian;
