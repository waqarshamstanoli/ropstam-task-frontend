import React from "react";

const AlertSuccess = ({messages, title= "Success"}) => {
    return (
        <div role="alert" className="mt-10">
            <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                {title}
            </div>
            {
                messages.length > 0 ?
                <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                    {messages.map((each, i) => (<p key={i+""}>{ each }</p>))}
                </div> : <></>
            }
        </div>
    )
}

export default AlertSuccess;
