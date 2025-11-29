import CurrentTestWidget from "../components/widgets/CurrentTestWidget";
import SidebarAndAccount from "../components/widgets/SidebarAndAccount";

const Dashboard = () => {
    return (
        <div
            style={{
                backgroundColor: "#F4F5F7",
            }}
        >
            <SidebarAndAccount />
            <CurrentTestWidget />
        </div>
    );
};

export default Dashboard;
