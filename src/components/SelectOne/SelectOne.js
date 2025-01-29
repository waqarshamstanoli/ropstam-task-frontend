import React from "react";

const SelectOne = ({ dataSet, optionValue = "id", optionTitle, value, name, onChange, labelText, defaultValue = "", defaultTitle="Select Option" }) => {
    return (
        <div className="relative">
            <label
                className="leading-7   text-start  text-black fmSaira text-xl	 font-medium"
            >
                {labelText}
            </label>
            <select
                name={name} id={name} onChange={onChange}
                value={value}
                className="w-full   rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            >
                <option value={defaultValue}>{defaultTitle}</option>
                {dataSet.map((each, index) => (
                    <option key={index+""} value={each[optionValue]}>{each[optionTitle]}</option>
                ))}

            </select>
        </div>
    )
}

export default SelectOne;
