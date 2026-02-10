import { useState } from "react";
import Switcher from "./Switcher";

const WEEK_DAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
const MONTHS = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];

const CalendarWidget = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startWeekDay = (firstDayOfMonth.getDay() + 6) % 7;

    const daysInMonth = lastDayOfMonth.getDate();

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const today = new Date();

    const days = [];

    for (let i = 0; i < startWeekDay; i++) {
        days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }

    return (
        <div className="DashboardWidgetCard">
            <h3 className="WidgetCardHeader">Календарь</h3>

            <Switcher
                value={`${MONTHS[month]} ${year}`}
                onPrev={prevMonth}
                onNext={nextMonth}
                style={{ marginBottom: "12px" }}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    marginBottom: "6px",
                }}
            >
                {WEEK_DAYS.map((day) => (
                    <div
                        key={day}
                        style={{
                            fontSize: "11px",
                            color: "#767676",
                            textAlign: "center",
                        }}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div style={{ flex: 1 }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gap: "12px",
                        fontSize: "14px",
                    }}
                >
                    {days.map((day, index) => {
                        const isToday =
                            day &&
                            day === today.getDate() &&
                            month === today.getMonth() &&
                            year === today.getFullYear();

                        return (
                            <div
                                key={index}
                                style={{
                                    height: "32px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    ...(isToday && {
                                        backgroundColor: "#8CC4FF",
                                        fontWeight: 500,
                                        width: 32,
                                        height: 32,
                                        borderRadius: "50%",
                                    }),
                                }}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    minHeight: "37px",
                    minWidth: "151px",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        backgroundColor: "#8CC4FF",
                        borderRadius: "19px",
                        fontSize: "14px",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{
                            backgroundColor: "#FFFFFF",
                            height: "26px",
                            width: "26px",
                            borderRadius: "50%",
                            fontWeight: 500,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            3
                        </div>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                        <span>Всего тестов</span>
                        <span
                            style={{
                                color: "#777",
                                fontSize: "11px",
                            }}
                        >
                            в этом месяце
                        </span>
                    </span>
                </div>

                <div
                    style={{
                        flex: 1,
                        backgroundColor: "#8CC4FF",
                        borderRadius: "19px",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#FFFFFF",
                            height: "26px",
                            width: "26px",
                            borderRadius: "50%",
                            fontWeight: 500,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            12
                        </div>
                    </div>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                        <span>Осталось дней</span>
                        <span
                            style={{
                                color: "#777",
                                fontSize: "11px",
                            }}
                        >
                            до след. теста
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CalendarWidget;
