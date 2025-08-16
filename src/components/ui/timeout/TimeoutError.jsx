const TimeoutError = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
        }}
    >
        <div style={{ textAlign: "center" }}>
            <h1>Ошибка 408</h1>
            <h3>Время ожидания истекло</h3>
        </div>
    </div>
);

export default TimeoutError;
