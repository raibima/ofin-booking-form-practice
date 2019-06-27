import React from "react";
import ReactDOM from "react-dom";

import BookingForm from "./containers/BookingForm";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Booking Form</h1>
      <BookingForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
