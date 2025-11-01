import SideBar from "../components/widgets/SideBar";

const SettingsPage = () => {
    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <SideBar />
            <div style={{ justifyItems: "center" }}>
                <h3>Настройки</h3>
            </div>
        </div>
    );
};

export default SettingsPage;
