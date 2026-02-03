import { useState } from "react";
import MathIcon from "../../assets/square-root.svg";
import PhysicsIcon from "../../assets/fi-rr-physics.svg";
import TabsSwitcher from "./TabSwitcher";

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
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: "16px",
                width: "338px",
                height: "444px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h3
                style={{
                    margin: 0,
                    marginBottom: "12px",
                    marginTop: "10px",
                    fontSize: "23px",
                    fontWeight: 600,
                }}
            >
                Предстоящие тесты
            </h3>

            <TabsSwitcher
                tabs={TABS}
                active={activeTab}
                onChange={setActiveTab}
            />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    flex: 1,
                    overflowY: "auto",
                    paddingRight: "4px",
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
                                backgroundColor: "#F4F5F7",
                            }}
                        >
                            <div
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "8px",
                                    backgroundColor: "#FFFFFF",
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
                                        fontSize: "16px",
                                        fontWeight: 500,
                                    }}
                                >
                                    {subjectConfig.label}
                                </div>
                                <div
                                    style={{
                                        fontSize: "11px",
                                        color: "#767676",
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
