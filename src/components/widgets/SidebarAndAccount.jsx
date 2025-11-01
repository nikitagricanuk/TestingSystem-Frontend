import PagesHeader from "./PagesHeader";
import SideBar from "./SideBar";

const SidebarAndAccount = (props) => {
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            <SideBar />
            <div style={{ flex: 1 }}>
                <PagesHeader pageName={props.pageName} />
            </div>
        </div>
    );
};

export default SidebarAndAccount;
