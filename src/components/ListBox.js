import React from "react";
import "./ListBox.css";

function ListBox(props) {
  const { options, id, title, onChange, className, onBlur } = props;
  const css = "list-select" + (className ? " list-error" : "");
  const spanCss = className ? "list-error-msg" : "list-no-error";
  const spanId = id + "_error";

  const optionList = options.map((option, index) => (
    <option value={option} key={index}>
      {option}
    </option>
  ));

  return (
    <div className="inputField" role="none">
      <label htmlFor={id}>{title}</label>
      <select
        id={id}
        onChange={onChange}
        required={true}
        aria-required={true}
        aria-describedby={spanId}
        className={css}
        onBlur={onBlur}
      >
        <option selected hidden disabled aria-hidden>
          Choose an option
        </option>
        {optionList}
      </select>
      <span id={spanId} className={spanCss} aria-live="assertive">
        You need to choose an option!
      </span>
    </div>
  );
}

export default ListBox;
