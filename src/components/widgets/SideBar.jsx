import Logo from "../../assets/Logo.svg";
import DashboardCardMenu from "./DashboardCardMenu";
import DashBoardCardSettings from "./DashboardCardSettings";
const SideBar = (props) => {
    return (
        <div
            style={{
                width: "308px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100vh",
                boxSizing: "border-box",
                backgroundColor: "#FFFFFF",
                borderRight: "1px solid #D7D7D7",
            }}
        >
            <div>
                <img
                    src={Logo}
                    alt="Логотип компании"
                    style={{
                        width: "261px",
                        marginTop: "25px",
                        marginLeft: "25px",
                        marginBottom: "30px",
                    }}
                />
                <DashboardCardMenu />
            </div>

            <DashBoardCardSettings />
        </div>
    );
};

export default SideBar;
