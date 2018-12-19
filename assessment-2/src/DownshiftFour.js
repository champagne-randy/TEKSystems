import React, { Component } from "react";
import DownshiftInputField from "./DownshiftInputField";

export default class DownshiftFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        { name: "Harry Potter" },
        { name: "Net Moves" },
        { name: "Half of a yellow sun" },
        { name: "The Da Vinci Code" },
        { name: "Born a crime" }
      ],
      movies: [
        { name: "Harry Potter" },
        { name: "12 Strong" },
        { name: "Half of a yellow sun" },
        { name: "Gringo" },
        { name: "Black Panther" }
      ],
      book: "",
      movie: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    alert(`
        Favourite book: ${this.state.book}
        Favourite movie: ${this.state.movie}
        has been submitted
        `);
  }

  onChange(selectedBook, stateAndHelpers) {
    const element = document.querySelector(`#${stateAndHelpers.id}-input`);
    this.setState({ [element.name]: selectedBook.name });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <DownshiftInputField
          items={this.state.books}
          onChange={this.onChange}
          label="Select your favourite book"
          name="book"
          placeholder="Search your favourite book"
        />
        <DownshiftInputField
          items={this.state.movies}
          onChange={this.onChange}
          label="Select your favourite movie"
          name="movie"
          placeholder="Search your favourite movie"
        />
        <input type="submit" value="Submit" className="dropdown-button" />
      </form>
    );
  }
}
