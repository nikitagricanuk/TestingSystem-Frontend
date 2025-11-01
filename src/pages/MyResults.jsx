import SideBar from "../components/widgets/SideBar";

const myResultsPage = () => {
    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <SideBar />
            <div style={{ justifyItems: "center" }}>
                <h3>Мои результаты</h3>
            </div>
        </div>
    );
};

export default myResultsPage;
