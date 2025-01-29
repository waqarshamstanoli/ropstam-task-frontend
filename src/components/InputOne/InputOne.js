import React from "react";

const InputOne = ({ type = "text", value, name, onChange, labelText, placeholder = "" }) => {
    return (
        <div className="relative">
            <label
                className="leading-7   text-start  text-black fmSaira text-xl	 font-medium"
            >
                {labelText}
            </label>
            <input
                type={type}
                name={name} id={name} onChange={onChange}
                value={value}
                placeholder={placeholder}
                className="w-full   rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
        </div>
    )
}

export default InputOne;
