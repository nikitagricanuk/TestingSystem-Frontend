import CurrentTestWidget from "../components/widgets/CurrentTestWidget";
import SidebarAndAccount from "../components/widgets/SidebarAndAccount";

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
            </SidebarAndAccount>
        </div>
    );
};

export default Dashboard;
