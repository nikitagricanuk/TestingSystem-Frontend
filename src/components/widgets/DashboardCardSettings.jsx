import Card from "../ui/card/Card";
import { NavLink } from "react-router-dom";
import SetingsIconNoActive from "../../assets/settingsNoActive.svg";
import SetingsIconActive from "../../assets/settingsActive.svg";
import ExitIconNoActive from "../../assets/exitIconNoActive.svg";

const navItems = [
    {
        id: "settings",
        label: "Настройки",
        path: "/settings",
        iconActive: SetingsIconActive,
        iconInactive: SetingsIconNoActive,
    },
];

const DashboardCardSettings = (props) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
            }}
        >
            <Card
                style={{
                    width: "260px",
                    height: "122px",
                    backgroundColor: "#F4F5F7",
                    borderRadius: "32px",
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "16px",
                    marginBottom: "48px",
                }}
            >
                {navItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? "activePage" : "NoActivePage"
                        }
                    >
                        {({ isActive }) => (
                            <div
                                style={{
                                    marginLeft: "18px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={
                                        isActive
                                            ? item.iconActive
                                            : item.iconInactive
                                    }
                                    alt={item.label}
                                />
                                <span
                                    style={{
                                        marginLeft: "12px",
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        )}
                    </NavLink>
                ))}
                <div
                    style={{
                        marginLeft: "18px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <img src={ExitIconNoActive} alt="Выход" />
                    <span
                        style={{
                            marginLeft: "12px",
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        Выйти
                    </span>
                </div>
            </Card>
        </div>
    );
};

export default DashboardCardSettings;
