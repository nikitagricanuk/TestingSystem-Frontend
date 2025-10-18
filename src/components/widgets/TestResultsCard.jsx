import ToMyResultsButton from "./ToMyResultsButton";
import BackGround from "../../assets/backgroundForTestRsults.png";

const TestResultsCard = (props) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "79px",
            }}
        >
            <div
                style={{
                    color: "white",
                    width: "1066px",
                    height: "713px",
                    borderRadius: "22px",
                    display: "flex",
                }}
            >
                <div
                    style={{
                        width: "520px",
                        height: "712px",
                        borderTopLeftRadius: "22px",
                        borderBottomLeftRadius: "22px",
                        backgroundColor: "#5A9BEA",
                    }}
                >
                    <p
                        style={{
                            marginTop: "42px",
                            justifyContent: "center",
                            display: "flex",
                        }}
                    >
                        Задание сделано "ДАТА из запроса"
                    </p>
                    <div style={{ justifyContent: "center", display: "grid" }}>
                        <span
                            style={{
                                fontSize: "250px",
                                fontWeight: "bold",
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            60
                        </span>
                        <span
                            style={{
                                fontSize: "48px",
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            балла(ов). Отлично!
                        </span>
                        <span
                            style={{
                                marginTop: "66px",
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            <ToMyResultsButton />
                        </span>
                    </div>
                </div>
                <div
                    style={{
                        width: "546px",
                        height: "712px",
                        borderTopRightRadius: "22px",
                        borderBottomRightRadius: "22px",
                        backgroundColor: "#818CF8",
                    }}
                >
                    <picture>
                        <img srcSet={BackGround} />
                    </picture>
                    <div style={{ marginLeft: "33px" }}>
                        <span
                            style={{
                                fontWeight: "bolder",
                                fontSize: "33px",
                            }}
                        >
                            Информация о попытке
                        </span>
                        <div
                            style={{
                                fontSize: "23px",
                                display: "grid",
                            }}
                        >
                            <div
                                style={{
                                    marginTop: "22px",
                                    marginRight: "35px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>Затраченное время</div>
                                <div>40:00</div>
                            </div>
                            <div
                                style={{
                                    marginTop: "22px",
                                    marginRight: "35px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>Решено задач</div>
                                <div>40</div>
                            </div>
                            <div
                                style={{
                                    marginTop: "22px",
                                    marginRight: "35px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>Верных ответов</div>
                                <div>36</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestResultsCard;
