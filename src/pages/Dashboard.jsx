import CurrentTestWidget from "../components/widgets/CurrentTestWidget";
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
                    }}
                >
                    <UpcomingTestsCard />
                </div>
            </SidebarAndAccount>
        </div>
    );
};

export default Dashboard;
