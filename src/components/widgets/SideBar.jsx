import Logo from "../../assets/Logo.svg";
import DashboardCardMenu from "./DashboardCardMenu";
import DashBoardCardSettings from "./DashboardCardSettings";
const SideBar = (props) => {
    return (
        <div
            style={{
                width: "308px",
                border: "1px solid black",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100vh",
                boxSizing: "border-box",
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
