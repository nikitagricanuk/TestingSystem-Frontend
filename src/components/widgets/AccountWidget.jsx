import placeholder from "../../assets/placeholder.svg";

const AccountWidget = () => {
    return (
        <div style={{ display: "flex" }}>
            <div>
                <img alt="avatar" src={placeholder} />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <span>Петр Петров</span>
                <span>Абитуриент</span>
            </div>
        </div>
    );
};

export default AccountWidget;
