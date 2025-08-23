const Card = ({ children, ...props }) => {
    return (
        <div className={props.className} {...props}>
            {children}
        </div>
    );
};

export default Card;
