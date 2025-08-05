const Answer = ({
    children,
    type,
    name,
    value,
    id,
    key,
    className,
    classNameLabel,
}) => {
    return (
        <div className={className}>
            <input type={type} name={name} value={value} id={id} key={key} />
            <label htmlFor={id} className={classNameLabel}>
                {children}
            </label>
        </div>
    );
};

export default Answer;
