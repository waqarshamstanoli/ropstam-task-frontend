import React from "react";

const AlertOne = ({errors, title= "Danger"}) => {
    return (
        <div role="alert" className="mt-10">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                {title}
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                {errors.map((each, i) => (<p key={i+""}>{ each }</p>))}
            </div>
        </div>
    )
}

export default AlertOne;
