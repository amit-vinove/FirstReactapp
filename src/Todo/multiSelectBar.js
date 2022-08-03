import React, { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import { XCircleFill, CaretDownFill } from "react-bootstrap-icons";
import styled from "styled-components";
import multiselectBarCss from "../css/multiselectBar.css";

function MultiSelectbar({
  colorsDB,
  optionsDB,
  borderColor,
  tagColor,
  tagTextColor,
  tagHoverColor,
  tagHoverTextColor,
  tagTextSize,
  tagCrossSize,
  placeholder,
  placeholderSize,
  listTextSize,
  listHoverColor,
  dropdownHeight,
  dropdownMarginTop,
  inputCrossSize,
  inputDropSize,
}) {
  const [dropdown, setDropdown] = useState(optionsDB);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [text, setText] = useState([]);
  const [option, setOptions] = useState(optionsDB);

  const TagStyle = styled.div`
    background-color: ${tagColor ? tagColor : "#dbd8d8"};
    padding: 5px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 500;
    color: ${tagTextColor ? tagTextColor : "black"};
    &:hover {
      background-color: ${tagHoverColor ? tagHoverColor : "#3ba2ff"};
      color: ${tagHoverTextColor ? tagHoverTextColor : "white"};
    }
  `;

  const TagText = styled.h5`
    font-size: ${tagTextSize ? tagTextSize : "20px"};
  `;

  const ListText = styled.h5`
  font-size: ${listTextSize ? listTextSize : "21px"}
  margin-top: 5px;
  margin-left: 10px;
  line-height: 1.6;
  `;

  const ListIcons = styled.h5`
  font-size: ${listTextSize ? listTextSize : "21px"}
  float: right;
  text-align: center;
  border-radius: 50%;
  width: fit-content;
  padding: 8px;
  color: white !important;
  line-height: 1.2;
  margin-top: 5px;
  `;

  const SelectList = styled.div`
    display: flex !important;
    padding: 3px;
    &:hover {
      background-color: ${listHoverColor ? listHoverColor : "#147fdc"};
      cursor: pointer;
      color: white !important;
      border-radius: 4px;
    }
  `;

  const initials = (username) => {
    return username
      .match(/(\b\S)?/g)
      .join("")
      .match(/(^\S|\S$)?/g)
      .join("")
      .toUpperCase();
  };

  const Select = (e, name) => {
    setText([...text, name]);
    setOptions(
      option.map((data) =>
        data.name === name ? { ...data, isSelected: true } : data
      )
    );
    setDropdown(
      dropdown.map((ele) =>
        ele.name === name ? { ...ele, isSelected: true } : ele
      )
    );
  };

  const searchOptions = (e) => {
    const result = [...option].filter(
      (ele) =>
        ele.name.toLowerCase().includes(e.toLowerCase()) &&
        ele.isSelected === false
    );
    setDropdown(result);
  };

  const remove = (e, name) => {
    const temp = text.filter((data, i) => data !== name);
    setText(temp);
    setOptions(
      option.map((data) =>
        data.name === name ? { ...data, isSelected: false } : data
      )
    );
    setDropdown(
      dropdown.map((ele) =>
        ele.name === name ? { ...ele, isSelected: false } : ele
      )
    );
  };

  const ClearSelected = (e) => {
    setText([]);
    setDropdown(optionsDB);
    setOptions(optionsDB);
  };

  return (
    <>
      <div>
        <Card
          style={{
            border: "1px solid",
            borderColor: `${borderColor ? borderColor : "#0d46b7"}`,
          }}
          onClick={(e) =>
            !dropdownVisible
              ? setDropdownVisible(true)
              : setDropdownVisible(false)
          }
        >
          <Card.Body style={{ padding: "10px" }}>
            <div className="row">
              <div className="col-md-11">
                <div style={{ display: "flex" }}>
                  {text.map((data) => (
                    <div key={Math.random()}>
                      {data && (
                        <TagStyle>
                          <TagText>
                            {data}
                            <XCircleFill
                              type="button"
                              onClick={(e) => remove(e, data)}
                              style={{
                                marginLeft: "10px",
                                fontSize: `${
                                  tagCrossSize ? tagCrossSize : "18px"
                                }`,
                              }}
                            />
                          </TagText>
                        </TagStyle>
                      )}
                    </div>
                  ))}
                  <h6
                    contenteditable="true"
                    style={{
                      outline: "0px",
                      marginTop: "8px",
                      fontSize: `${placeholderSize ? placeholderSize : "18px"}`,
                    }}
                    data-text={placeholder ? placeholder : "Search here..."}
                    onInput={(e) => {
                      searchOptions(e.currentTarget.textContent);
                    }}
                  ></h6>
                </div>
              </div>
              <div className="col-md-1" style={{ marginTop: "8px" }}>
                <CaretDownFill
                  type="button"
                  style={{
                    fontSize: `${inputDropSize ? inputDropSize : "23px"}`,
                  }}
                  className="caret"
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
                    fontSize: `${inputCrossSize ? inputCrossSize : "18px"}`,
                  }}
                  className="xCircle"
                  onClick={(e) => ClearSelected(e)}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      {dropdownVisible && (
        <div>
          <Card
            style={{
              width: "100%",
              marginTop: `${dropdownMarginTop ? dropdownMarginTop : "1px"}`,
              maxHeight: `${dropdownHeight ? dropdownHeight : "280px"}`,
              overflowY: "auto",
            }}
          >
            <Card.Body style={{ padding: "8px" }}>
              {dropdown.map((data, i) => (
                <div key={Math.random()}>
                  {!data.isSelected && (
                    <div
                      className="col-md-12 "
                      onClick={(e) => Select(e, data.name)}
                    >
                      <SelectList>
                        <ListIcons style={{ background: `${colorsDB[i % 5]}` }}>
                          {initials(data.name)}
                        </ListIcons>
                        <ListText>{data.name}</ListText>
                      </SelectList>
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
    </>
  );
}

export default MultiSelectbar;
