import React from "react";
export default ({ item, name, onChange }) => {
  return (
    <div className="form-group">
      <div className="custom-control custom-radio mb-3">
        <input
          type="radio"
          className="custom-control-input"
          name={name}
          id={item.title}
          value={item.value}
          onChange={onChange}
        />
        <label className="custom-control-label" htmlFor={item.title}>
          {item.title}
        </label>
      </div>
    </div>
  );
};
