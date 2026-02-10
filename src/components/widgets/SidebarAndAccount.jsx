import PagesHeader from "./PagesHeader";
import SideBar from "./SideBar";

const SidebarAndAccount = ({ pageName, children }) => {
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
            }}
        >
            <SideBar />

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <PagesHeader pageName={pageName} />

                <div>{children}</div>
            </div>
        </div>
    );
};

export default SidebarAndAccount;
