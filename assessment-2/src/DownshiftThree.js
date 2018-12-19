import React, { Component } from "react";
import Downshift from "downshift";

export default class DownshiftThree extends Component {
  constructor(props) {
    super(props);
    this.books = [
      { name: "Harry Potter" },
      { name: "Net Moves" },
      { name: "Half of a yellow sun" },
      { name: "The Da Vinci Code" },
      { name: "Born a crime" }
    ];

    this.state = {
      selectedBook: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(selectedBook) {
    this.setState({ selectedBook: selectedBook.name });
  }

  render() {
    return (
      <Downshift
        onChange={this.onChange}
        selectedItem={this.state.selectedBook}
        itemToString={books => (books ? books.name : "")}
      >
        {({
          isOpen,
          getToggleButtonProps,
          getItemProps,
          highlightedIndex,
          selectedItem: dsSelectedItem,
          getLabelProps
        }) => (
          <div>
            <label
              style={{ marginTop: "1rem", display: "block" }}
              {...getLabelProps()}
            >
              Select your favourite book
            </label>{" "}
            <br />
            <button className="dropdown-button" {...getToggleButtonProps()}>
              {this.state.selectedBook !== ""
                ? this.state.selectedBook
                : "Select a book ..."}
            </button>
            <div style={{ position: "relative" }}>
              {isOpen ? (
                <div className="downshift-dropdown">
                  {this.books.map((item, index) => (
                    <div
                      className="dropdown-item"
                      {...getItemProps({ key: index, index, item })}
                      style={{
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        fontWeight:
                          dsSelectedItem === item.name ? "bold" : "normal"
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                  }
                </div>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}
