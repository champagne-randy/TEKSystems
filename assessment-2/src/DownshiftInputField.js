import React from "react";
import Downshift from "downshift";

export default ({ items, onChange, label, placeholder, name }) => {
  return (
    <Downshift
      onChange={onChange}
      itemToString={items => (items ? items.name : "")}
    >
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getLabelProps
      }) => (
        <div>
          <label
            style={{ marginTop: "1rem", display: "block" }}
            {...getLabelProps()}
          >
            {label}
          </label>{" "}
          <br />
          <input name={name} {...getInputProps({ placeholder })} />
          {isOpen ? (
            <div className="downshift-dropdown">
              {items

                .filter(
                  item =>
                    !inputValue ||
                    item.name.toLowerCase().includes(inputValue.toLowerCase())
                )

                .map((item, index) => (
                  <div
                    className="dropdown-item"
                    {...getItemProps({ key: item.name, index, item })}
                    style={{
                      backgroundColor:
                        highlightedIndex === index ? "lightgray" : "white",
                      fontWeight: selectedItem === item ? "bold" : "normal"
                    }}
                  >
                    {item.name}
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};
