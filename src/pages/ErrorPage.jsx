const ErrorPage = () => {
    return (
        <div
            style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
            }}
        >
            <div style={{ justifyItems: "center" }}>
                <h1>Ошибка 404</h1>
                <h3>Похоже такой страницы не существует(</h3>
            </div>
        </div>
    );
};

export default ErrorPage;
