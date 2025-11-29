import AccountWidget from "./AccountWidget";

const PagesHeader = (props) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                boxSizing: "border-box",
                marginTop: "12px",
                marginLeft: "33px",
                marginRight: "32px",
            }}
        >
            <div
                style={{
                    fontSize: "33px",
                    fontWeight: "bold",
                }}
            >
                {props.pageName}
            </div>
            <AccountWidget />
        </div>
    );
};

export default PagesHeader;
