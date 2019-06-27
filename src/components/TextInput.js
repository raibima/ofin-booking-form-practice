import React from "react";
import "./TextInput.css";

function TextInput(props) {
  const {
    id,
    title,
    value,
    type,
    onChange,
    className,
    onBlur,
    errorMessage
  } = props;
  const css = "textinput" + (className ? " text-error" : "");
  const spanCss = className ? "text-error-msg" : "text-no-error";
  const spanId = id + "_error";

  return (
    <div className="inputField" role="none">
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={true}
        aria-required={true}
        aria-describedby={spanId}
        className={css}
      />
      <span id={spanId} className={spanCss} aria-live="assertive">
        {errorMessage}
      </span>
    </div>
  );
}

export default TextInput;
