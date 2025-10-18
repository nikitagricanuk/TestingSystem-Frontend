import ToMyResultsButton from "./ToMyResultsButton";
import BackGround from "../../assets/backgroundForTestRsults.png";

const TestResultsCard = (props) => {
    return (
        <div className="TestResultsCard">
            <div className="resultCard">
                <div className="leftSideCard">
                    <p className="dateCompleteTest">
                        Задание сделано "ДАТА из запроса"
                    </p>
                    <div
                        style={{
                            display: "grid",
                            marginLeft: "57px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "250px",
                                fontWeight: "bold",
                            }}
                        >
                            64
                        </div>
                        <div
                            style={{
                                fontSize: "48px",
                                fontWeight: "600",
                            }}
                        >
                            балла(ов). Отлично!
                        </div>
                        <div
                            style={{
                                marginTop: "66px",
                            }}
                        >
                            <ToMyResultsButton />
                        </div>
                    </div>
                </div>
                <div className="rightSideCard">
                    <picture>
                        <img srcSet={BackGround} />
                    </picture>
                    <div style={{ marginLeft: "33px" }}>
                        <div
                            style={{
                                fontWeight: "bolder",
                                fontSize: "33px",
                            }}
                        >
                            Информация о попытке
                        </div>
                        <div
                            style={{
                                fontSize: "23px",
                                display: "grid",
                            }}
                        >
                            <div className="attemptInfo">
                                <div>Затраченное время</div>
                                <div>40:00</div>
                            </div>
                            <div className="attemptInfo">
                                <div>Решено задач</div>
                                <div>40</div>
                            </div>
                            <div className="attemptInfo">
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
