import React from "react";

const Button = ({ children, ...props }) => {
    return (
        <div>
            <button className={props.className} onClick={props.onClick}>
                {children}
            </button>
        </div>
    );
};

export default Button;
