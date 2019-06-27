import React from "react";
import ReactDOM from "react-dom";

import BookingForm from "./containers/BookingForm";
import BookingFormAlt from "./containers/BookingFormAlt";
import "./styles.css";

function App() {
  const [alt, setAlt] = React.useState(false);

  function handleChange(e) {
    if (e.target.checked) {
      setAlt(true);
    } else {
      setAlt(false);
    }
  }

  return (
    <div className="App">
      <h1>Booking Form</h1>
      <label>
        <input type="checkbox" onChange={handleChange} /> Use alt
      </label>
      {!alt && <BookingForm />}
      {alt && <BookingFormAlt />}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
