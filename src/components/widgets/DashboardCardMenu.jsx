import Card from "../ui/card/Card";
import { NavLink } from "react-router-dom";
import DashboardIcon from "../../assets/DashboardIcon.svg";
import RatingIcon from "../../assets/ratingIcon.svg";
import ResultsIcon from "../../assets/resultIcon.svg";
import DashboardIconNoActive from "../../assets/DashboardIconNoActive.svg";
import RatingIconNoActive from "../../assets/ratingIconNoActive.svg";
import ResultsIconNoActive from "../../assets/resultIconNoActive.svg";

const navItems = [
    {
        id: "dashboard",
        label: "Главная",
        path: "/dashboard",
        iconActive: DashboardIcon,
        iconInactive: DashboardIconNoActive,
    },
    {
        id: "rating",
        label: "Рейтинг",
        path: "/rating",
        iconActive: RatingIcon,
        iconInactive: RatingIconNoActive,
    },
    {
        id: "results",
        label: "Мои результаты",
        path: "/myResults",
        iconActive: ResultsIcon,
        iconInactive: ResultsIconNoActive,
    },
];

const DashboardCardMenu = (props) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Card
                style={{
                    width: "260px",
                    height: "186px",
                    backgroundColor: "#F4F5F7",
                    borderRadius: "32px",
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "16px",
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
                                    }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        )}
                    </NavLink>
                ))}
            </Card>
        </div>
    );
};

export default DashboardCardMenu;
