import placeholder from "../../assets/placeholder.svg";

const AccountWidget = () => {
    return (
        <div
            style={{
                display: "flex",
                backgroundColor: "white",
                width: "174px",
                height: "48px",
                borderRadius: "21.5px",
                justifyContent: "space-around",
                alignItems: "center",
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <img alt="avatar" src={placeholder} />
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <span>Петр Петров</span>
                <span>Абитуриент</span>
            </div>
        </div>
    );
};

export default AccountWidget;
