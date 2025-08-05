const Button = ({ children, ...props }) => {
    return (
        <button className={props.className} {...props}>
            {children}
        </button>
    );
};

export default Button;
