import CalendarWidget from "../components/widgets/CalendarWidget";
import CurrentTestWidget from "../components/widgets/CurrentTestWidget";
import ProgressWidget from "../components/widgets/ProgressWidget";
import SidebarAndAccount from "../components/widgets/SidebarAndAccount";
import UpcomingTestsCard from "../components/widgets/UpcomingTestCard";

const Dashboard = () => {
    return (
        <div style={{ backgroundColor: "#F4F5F7" }}>
            <SidebarAndAccount pageName="Главная">
                <div
                    style={{
                        paddingLeft: "33px",
                        paddingRight: "32px",
                        marginTop: "12px",
                    }}
                >
                    <CurrentTestWidget />
                </div>
                <div
                    style={{
                        paddingLeft: "33px",
                        marginTop: "16px",
                        display: "flex",
                    }}
                >
                    <div>
                        <UpcomingTestsCard />
                    </div>
                    <div
                        style={{
                            paddingLeft: "33px",
                        }}
                    >
                        <CalendarWidget />
                    </div>
                    <div
                        style={{
                            paddingLeft: "33px",
                        }}
                    >
                        <ProgressWidget />
                    </div>
                </div>
            </SidebarAndAccount>
        </div>
    );
};

export default Dashboard;
