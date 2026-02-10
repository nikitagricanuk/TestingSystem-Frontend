import { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import Switcher from "./Switcher";

const SUBJECTS = {
    physics: {
        label: "Физика",
        data: [
            { day: 1, xp: 20 },
            { day: 4, xp: 25 },
            { day: 8, xp: 70 },
            { day: 12, xp: 80 },
            { day: 16, xp: 40 },
            { day: 20, xp: 30 },
            { day: 24, xp: 90 },
            { day: 28, xp: 130 },
            { day: 31, xp: 80 },
        ],
    },
    math: {
        label: "Математика",
        data: [
            { day: 1, xp: 25 },
            { day: 4, xp: 25 },
            { day: 8, xp: 75 },
            { day: 12, xp: 80 },
            { day: 16, xp: 45 },
            { day: 20, xp: 35 },
            { day: 24, xp: 100 },
            { day: 28, xp: 140 },
            { day: 31, xp: 85 },
        ],
    },
    biology: {
        label: "Биология",
        data: [
            { day: 1, xp: 10 },
            { day: 6, xp: 20 },
            { day: 12, xp: 40 },
            { day: 18, xp: 60 },
            { day: 24, xp: 70 },
            { day: 31, xp: 60 },
        ],
    },
    chemistry: {
        label: "Химия",
        data: [
            { day: 2, xp: 15 },
            { day: 7, xp: 35 },
            { day: 14, xp: 55 },
            { day: 21, xp: 75 },
            { day: 28, xp: 90 },
        ],
    },
    informatics: {
        label: "Информатика",
        data: [
            { day: 1, xp: 40 },
            { day: 5, xp: 60 },
            { day: 10, xp: 90 },
            { day: 15, xp: 110 },
            { day: 20, xp: 130 },
            { day: 25, xp: 150 },
        ],
    },
};

const ProgressWidget = () => {
    const subjectKeys = Object.keys(SUBJECTS);
    const [activeIndex, setActiveIndex] = useState(1);

    const activeSubject = SUBJECTS[subjectKeys[activeIndex]];

    const prevSubject = () => {
        setActiveIndex((i) => Math.max(0, i - 1));
    };

    const nextSubject = () => {
        setActiveIndex((i) => Math.min(subjectKeys.length - 1, i + 1));
    };

    return (
        <div className="DashboardWidgetCard">
            <h3 className="WidgetCardHeader">Прогресс</h3>

            <div
                style={{
                    width: "100%",
                    height: "300px",
                    marginLeft: "-10px",
                }}
            >
                <ResponsiveContainer>
                    <AreaChart data={activeSubject.data}>
                        <CartesianGrid
                            horizontal
                            vertical={false}
                            stroke="#E5E5E5"
                            strokeDasharray="0"
                        />
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickCount={9}
                            tickFormatter={(v) => `${v} XP`}
                        />
                        <Tooltip formatter={(value) => [`${value} XP`, ""]} />
                        <Area
                            type="monotone"
                            dataKey="xp"
                            stroke="#5A9BEA"
                            fill="#5A9BEA"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div
                style={{
                    textAlign: "center",
                    fontSize: "23px",
                    fontWeight: 500,
                    marginBottom: "12px",
                }}
            >
                Июнь
            </div>
            <Switcher
                value={activeSubject.label}
                onPrev={prevSubject}
                onNext={nextSubject}
                disablePrev={activeIndex === 0}
                disableNext={activeIndex === subjectKeys.length - 1}
            />
        </div>
    );
};

export default ProgressWidget;
