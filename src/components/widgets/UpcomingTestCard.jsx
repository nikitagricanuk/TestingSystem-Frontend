import { useState } from "react";
import MathIcon from "../../assets/square-root.svg";
import PhysicsIcon from "../../assets/fi-rr-physics.svg";

const TABS = ["Все", "Неделя", "Месяц", "Год"];

const SUBJECTS = {
    math: {
        label: "Математика",
        icon: MathIcon,
    },
    physics: {
        label: "Физика",
        icon: PhysicsIcon,
    },
};

const MOCK_TESTS = [
    { id: 1, subject: "math", date: "12.03.2025", period: "Неделя" },
    { id: 2, subject: "physics", date: "12.04.2025", period: "Месяц" },
    { id: 3, subject: "math", date: "12.03.2025", period: "Неделя" },
    { id: 4, subject: "physics", date: "12.04.2025", period: "Год" },
    { id: 5, subject: "math", date: "12.03.2025", period: "Год" },
    { id: 6, subject: "physics", date: "12.04.2025", period: "Месяц" },
];

const UpcomingTestsCard = () => {
    const [activeTab, setActiveTab] = useState("Все");

    const filteredTests =
        activeTab === "Все"
            ? MOCK_TESTS
            : MOCK_TESTS.filter((t) => t.period === activeTab);

    return (
        <div
            style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "16px",
                width: "338px",
                minHeight: "444px",
                boxSizing: "border-box",
            }}
        >
            <h3
                style={{
                    margin: 0,
                    marginBottom: "12px",
                    fontSize: "18px",
                    fontWeight: 600,
                }}
            >
                Предстоящие тесты
            </h3>

            <div
                style={{
                    display: "flex",
                    gap: "6px",
                    backgroundColor: "#F1F2F4",
                    borderRadius: "10px",
                    padding: "4px",
                    marginBottom: "12px",
                }}
            >
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            flex: 1,
                            border: "none",
                            background: "transparent",
                            padding: "6px 0",
                            fontSize: "13px",
                            cursor: "pointer",
                            borderRadius: "8px",
                            color: activeTab === tab ? "#000" : "#555",
                            fontWeight: activeTab === tab ? 500 : 400,
                            backgroundColor:
                                activeTab === tab ? "#fff" : "transparent",
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                }}
            >
                {filteredTests.map((test) => {
                    const subjectConfig = SUBJECTS[test.subject];

                    if (!subjectConfig) return null;

                    return (
                        <div
                            key={test.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px",
                                borderRadius: "12px",
                                backgroundColor: "#F7F8FA",
                            }}
                        >
                            <div
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "8px",
                                    backgroundColor: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    src={subjectConfig.icon}
                                    alt={subjectConfig.label}
                                    width="24"
                                    height="24"
                                />
                            </div>

                            <div>
                                <div
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 500,
                                    }}
                                >
                                    {subjectConfig.label}
                                </div>
                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#777",
                                    }}
                                >
                                    {test.date}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UpcomingTestsCard;
