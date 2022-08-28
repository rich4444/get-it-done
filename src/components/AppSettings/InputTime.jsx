import React from "react";

function InputTime({ className, handleChange, current, text }) {
    return (
        <div className={className}>
            <label htmlFor={text}>{text.toUpperCase()}</label>
            <input
                onChange={handleChange}
                type="number"
                name={text}
                defaultValue={current / 60}
                min="1"
            />
        </div>
    );
}

export default InputTime;
