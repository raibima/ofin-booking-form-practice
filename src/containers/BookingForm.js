import React from "react";
import moment from "moment";

import TextInput from "../components/TextInput";
import ListBox from "../components/ListBox";
import Checkbox from "../components/Checkbox";
import "./BookingForm.css";

function validate(first_name, last_name, title, dob, hasFF, ff_program, ff_id) {
  if (hasFF) {
    return {
      first_name:
        first_name.length === 0 || first_name.match(/^[A-Za-z]+$/) === null,
      last_name:
        last_name.length === 0 || last_name.match(/^[A-Za-z]+$/) === null,
      title: title.length === 0,
      dob:
        dob.length === 0 ||
        moment().diff(dob, "years") < 18 ||
        !moment(dob).isValid(),
      ff_program: ff_program.length === 0,
      ff_id: ff_id.length === 0
    };
  }
  return {
    first_name:
      first_name.length === 0 || first_name.match(/^[A-Za-z]+$/) === null,
    last_name:
      last_name.length === 0 || last_name.match(/^[A-Za-z]+$/) === null,
    title: title.length === 0,
    dob:
      dob.length === 0 ||
      moment().diff(dob, "years") < 18 ||
      !moment(dob).isValid()
  };
}

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: "",
        last_name: "",
        title: "",
        dob: "",
        ff_program: "",
        ff_id: ""
      },
      touched: {
        first_name: false,
        last_name: false,
        title: false,
        dob: false,
        ff_program: false,
        ff_id: false
      },
      hasFF: false //true
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleCheckboxFF = this.handleCheckboxFF.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur(e) {
    this.setState({
      touched: {
        ...this.state.touched,
        [e.target.id]: true
      }
    });
  }

  handleInput(e) {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.id]: e.target.value
      }
    });

    if (e.target.id === "dob") {
      const today = moment();
      if (today.diff(e.target.value, "years") < 18) {
        alert("You must be older than 18 years old!");
      }
      if (!moment(e.target.value).isValid()) {
        alert("You need to enter a valid date!");
      }
    } else if (e.target.id === "first_name" || e.target.id === "last_name") {
      if (e.target.value.match(/^[A-Za-z]+$/) === null) {
        alert("Your name should only contain letters!");
      }
    }
  }

  handleCheckboxFF(e) {
    this.setState(state => ({ hasFF: !state.hasFF }));
  }

  canSubmit() {
    const {
      first_name,
      last_name,
      title,
      dob,
      ff_program,
      ff_id
    } = this.state.user;

    const errors = validate(
      first_name,
      last_name,
      title,
      dob,
      this.state.hasFF,
      ff_program,
      ff_id
    );

    const isDisabled = Object.keys(errors).some(i => errors[i]);
    return !isDisabled;
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      first_name,
      last_name,
      title,
      dob,
      ff_program,
      ff_id
    } = this.state.user;

    const output =
      `
    First name: ${first_name}
    Last name: ${last_name}
    Title: ${title}
    Date of Birth: ${dob}
    ` +
      (this.state.hasFF
        ? `
    Frequent Flyer
    Program: ${ff_program}
    ID: ${ff_id}`
        : ``);

    console.log(output);
  }

  render() {
    const titleList = ["Mr", "Mrs", "Ms"];
    const programlist = ["a", "b", "c"];
    const isEnabled = !this.canSubmit();
    const {
      first_name,
      last_name,
      title,
      dob,
      ff_program,
      ff_id
    } = this.state.user;

    const isError = input => {
      const showError = this.state.touched[input];
      return errors[input] ? showError : false;
    };

    const errors = validate(
      first_name,
      last_name,
      title,
      dob,
      this.state.hasFF,
      ff_program,
      ff_id
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          id="first_name"
          title="First name (required)"
          value={first_name}
          type="text"
          onChange={this.handleInput}
          onBlur={this.handleBlur}
          className={isError("first_name")}
        />
        <TextInput
          id="last_name"
          title="Last name (required)"
          value={last_name}
          type="text"
          onChange={this.handleInput}
          onBlur={this.handleBlur}
          className={isError("last_name")}
        />
        <ListBox
          id="title"
          title="Title (required)"
          options={titleList}
          onChange={this.handleInput}
          onBlur={this.handleBlur}
          className={isError("title")}
        />
        <TextInput
          id="dob"
          title="Date of birth (required)"
          value={dob}
          type="date"
          onChange={this.handleInput}
          onBlur={this.handleBlur}
          className={isError("dob")}
        />
        <Checkbox
          title="Frequent Flyer"
          id="ff"
          type="hasFF"
          onChange={this.handleCheckboxFF}
        />
        {this.state.hasFF && (
          <fieldset className="frequentFlyerGroup">
            <ListBox
              id="ff_program"
              title="Program (required)"
              options={programlist}
              onChange={this.handleInput}
              onBlur={this.handleBlur}
              className={isError("ff_program")}
            />
            <TextInput
              id="ff_id"
              title="ID (required)"
              onChange={this.handleInput}
              onBlur={this.handleBlur}
              className={isError("ff_id")}
            />
          </fieldset>
        )}
        <button type="submit" disabled={isEnabled} className="submit-btn">
          Submit Form
        </button>
      </form>
    );
  }
}

export default BookingForm;
