import AccountWidget from "./AccountWidget";

const PagesHeader = (props) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    fontSize: "33px",
                    fontWeight: "bold",
                    marginLeft: "33px",
                }}
            >
                {props.pageName}
            </div>
            <AccountWidget />
        </div>
    );
};

export default PagesHeader;
