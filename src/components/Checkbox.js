import React from "react";
import "./Checkbox.css";

function Checkbox(props) {
  const { name, checked, onChange, title } = props;
  return (
    <div className="checkbox" role="none">
      <label>
        <input
          type="checkbox"
          id={name}
          checked={checked}
          onChange={onChange}
        />
        {title}
      </label>
    </div>
  );
}

export default Checkbox;
