import PagesHeader from "./PagesHeader";
import SideBar from "./SideBar";

const SidebarAndAccount = ({ pageName, children }) => {
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            <SideBar />

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <PagesHeader pageName={pageName} />

                <div style={{ flex: 1 }}>{children}</div>
            </div>
        </div>
    );
};

export default SidebarAndAccount;
