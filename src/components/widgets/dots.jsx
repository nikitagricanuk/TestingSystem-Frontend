const Dots = ({ size }) => {
    const dots = [];

    for (let i = 0; i < size; i++) {
        dots.push(
            <div
                key={i}
                style={{
                    backgroundColor: "#3F82C9",
                    borderRadius: "50%",
                    height: `5px`,
                    width: `5px`,
                    flexShrink: 0,
                }}
            />
        );
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100vw", // 80% ширины окна браузера
                maxWidth: "100%", // максимальная ширина контейнера
                margin: "0 auto",
            }}
        >
            {dots}
        </div>
    );
};

export default Dots;
