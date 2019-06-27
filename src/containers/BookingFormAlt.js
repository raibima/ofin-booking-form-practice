import React from "react";
import moment from "moment";
import _TextInput from "../components/TextInput";
import _ListBox from "../components/ListBox";
import _Checkbox from "../components/Checkbox";
import "./BookingForm.css";

const programList = ["Garuda Miles", "Qantas Frequent Flyer"];
const titleList = ["Mr.", "Mrs.", "Ms."];

const TextInput = React.memo(_TextInput);
const ListBox = React.memo(_ListBox);
const Checkbox = React.memo(_Checkbox);

const validationSchema = {
  first_name: [
    [validateRequired, "This is required"],
    [validateLetterOnly, "This can only be letters"]
  ],
  last_name: [
    [validateRequired, "This is required"],
    [validateLetterOnly, "This can only be letters"]
  ],
  title: [
    [validateRequired, "This is required"],
    [validateTitle, "Only possible values are Mr., Mrs., and Ms."]
  ],
  dob: [[validateDateOfBirth, "You must be above 18 years old"]],
  ff_program: [[validateRequired, "This is required"]],
  ff_id: [[validateRequired, "This is required"]]
};

class BookingFormAlt extends React.Component {
  state = {
    // values
    first_name: {
      value: "",
      touched: false
    },
    last_name: {
      value: "",
      touched: false
    },
    title: {
      value: "",
      touched: false
    },
    dob: {
      value: "",
      touched: false
    },
    ff_program: {
      value: "",
      touched: false
    },
    ff_id: {
      value: "",
      touched: false
    },
    // other states
    hasFF: false
  };

  handleInput = e => {
    const { id, value } = e.target;
    this.setState(state => {
      return {
        [id]: {
          ...state[id],
          value
        }
      };
    });
  };

  handleBlur = e => {
    const { id } = e.target;
    if (!this.state[id].touched) {
      this.setState(state => ({
        [id]: {
          ...state[id],
          touched: true
        }
      }));
    }
  };

  handleCheckboxFF = e => {
    this.setState({
      hasFF: e.target.checked
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { first_name, last_name, dob, ff_id } = this.state;

    const validationResult = validate(this.state, validationSchema);

    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          id="first_name"
          title="First name (required)"
          value={first_name.value}
          type="text"
          onChange={this.handleInput}
          onBlur={this.handleBlur}
          className={
            isTouched("first_name", this.state) &&
            !isValid("first_name", validationResult)
          }
          errorMessage={getErrorMessage("first_name", validationResult)}
        />
        <TextInput
          id="last_name"
          title="Last name (required)"
          value={last_name.value}
          type="text"
          onChange={this.handleInput}
          onBlur={this.handleBlur}
          className={
            isTouched("last_name", this.state) &&
            !isValid("last_name", validationResult)
          }
          errorMessage={getErrorMessage("last_name", validationResult)}
        />
        <ListBox
          id="title"
          title="Title (required)"
          options={titleList}
          onChange={this.handleInput}
          onBlur={this.handleBlur}
          className={
            isTouched("title", this.state) &&
            !isValid("title", validationResult)
          }
          errorMessage={getErrorMessage("title", validationResult)}
        />
        <TextInput
          id="dob"
          title="Date of birth (required)"
          value={dob.value}
          type="date"
          onChange={this.handleInput}
          onBlur={this.handleBlur}
          className={
            isTouched("dob", this.state) && !isValid("dob", validationResult)
          }
          errorMessage={getErrorMessage("dob", validationResult)}
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
              options={programList}
              onChange={this.handleInput}
              onBlur={this.handleBlur}
              className={
                isTouched("ff_program", this.state) &&
                !isValid("ff_program", validationResult)
              }
              errorMessage={getErrorMessage("ff_program", validationResult)}
            />
            <TextInput
              id="ff_id"
              title="ID (required)"
              value={ff_id.value}
              onChange={this.handleInput}
              onBlur={this.handleBlur}
              className={
                isTouched("ff_id", this.state) &&
                !isValid("ff_id", validationResult)
              }
              errorMessage={getErrorMessage("ff_id", validationResult)}
            />
          </fieldset>
        )}
        <button
          type="submit"
          className="submit-btn"
          disabled={!canSubmit(this.state, validationResult)}
        >
          Submit Form
        </button>
      </form>
    );
  }
}

function validate(_formState, schema) {
  const result = {};
  const { hasFF, ...formState } = _formState;
  for (const [fieldName, fieldState] of Object.entries(formState)) {
    const { value } = fieldState;

    const fieldValidationResult = [];

    let shouldValidate = true;

    if (fieldName === "ff_program" || fieldName === "ff_id") {
      shouldValidate = hasFF;
    }

    if (shouldValidate) {
      const validators = schema[fieldName];
      for (const [validator, errorMessage] of validators) {
        if (!validator(value)) {
          fieldValidationResult.push(errorMessage);
        }
      }
    }

    result[fieldName] = fieldValidationResult;
  }
  return result;
}

function isValid(fieldName, validationResult) {
  return validationResult[fieldName].length === 0;
}

function isTouched(fieldName, formState) {
  return formState[fieldName].touched === true;
}

function getErrorMessage(fieldName, validationResult) {
  const fieldResult = validationResult[fieldName];
  if (fieldResult.length > 0) {
    return fieldResult[0];
  }
  return "";
}

function canSubmit(formState, validationResult) {
  return (
    !isPristine(formState) &&
    !Object.values(validationResult).some(errors => errors.length > 0)
  );
}

function isPristine(_formState) {
  const { hasFF, ...formState } = _formState;
  return !Object.values(formState).some(field => field.touched === true);
}

// validators
function validateRequired(str) {
  if (typeof str === "string") {
    return str.trim().length > 0;
  }
  return false;
}

function validateLetterOnly(str) {
  if (typeof str === "string") {
    return /^[a-zA-Z\s]*$/.test(str);
  }
  return false;
}

function validateTitle(str) {
  if (typeof str === "string") {
    return ["Mr.", "Mrs.", "Ms."].includes(str);
  }
  return false;
}

function validateDateOfBirth(dob) {
  const date = moment(dob);
  if (date.isValid()) {
    return moment().diff(date, "years") >= 18;
  }
  return false;
}

export default BookingFormAlt;
