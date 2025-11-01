import SideBar from "../components/widgets/SideBar";

const RatingPage = () => {
    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <SideBar />
            <div style={{ justifyItems: "center" }}>
                <h3>Рейтинг</h3>
            </div>
        </div>
    );
};

export default RatingPage;
