import React, { Component } from "react";
import Downshift from "downshift";
import { Popper, Manager, Reference } from "react-popper";

export default class DownshiftFive extends Component {
  static defaultProps = {
    positions: [
      "top",
      "top-start",
      "top-end",
      "bottom-start",
      "bottom",
      "bottom-end"
    ]
  };

  render() {
    return (
      <div className="popper-div">
        <Manager>
          <Downshift
            render={({
              inputValue,
              getInputProps,
              getItemProps,
              isOpen,
              selectedItem,
              highlightedIndex
            }) => (
              <div>
                <Reference>
                  {({ ref }) => (
                    <input
                      ref={ref}
                      {...getInputProps({ placeholder: "Enter a position" })}
                    />
                  )}
                </Reference>
                <div className="downshift-dropdown">
                  {isOpen ? (
                    <Popper
                      placement={selectedItem || "bottom"}
                      style={{ backgroundColor: "skyblue" }}
                    >
                      {this.props.positions
                        .filter(
                          item =>
                            !inputValue ||
                            item.includes(inputValue.toLowerCase())
                        )

                        .map((item, index) => (
                          <div
                            className="downshift-item popper-item"
                            {...getItemProps({ item })}
                            key={item}
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                highlightedIndex === index
                                  ? "#bed5df"
                                  : "transparent",
                              fontWeight:
                                selectedItem === item ? "bold" : "normal"
                            }}
                          >
                            {item}
                          </div>
                        ))}
                    </Popper>
                  ) : null}
                </div>
              </div>
            )}
          />
        </Manager>
      </div>
    );
  }
}
