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
                    <div>
                        <span
                            style={{
                                fontWeight: "bolder",
                                fontSize: "33px",
                            }}
                        >
                            Информация о попытке
                        </span>
                        <div>
                            <div>
                                Затраченное время
                                <span>40:00</span>
                            </div>
                            <div>
                                Решено задач <span>40</span>
                            </div>
                            <div>
                                Верных ответов <span>36</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestResultsCard;
