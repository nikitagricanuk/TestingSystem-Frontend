import Logo from "../../assets/Logo.svg";
import DashboardCardMenu from "./DashboardCardMenu";

const SideBar = (props) => {
    return (
        <div
            style={{
                width: "308px",
                border: "1px solid black",
            }}
        >
            <img src={Logo} alt="Логотип компании" style={{ width: "308px" }} />
            <DashboardCardMenu />
        </div>
    );
};

export default SideBar;
