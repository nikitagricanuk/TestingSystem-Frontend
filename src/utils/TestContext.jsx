import { createContext, useContext, useState, useMemo } from "react";

const TestContext = createContext();

export function TestProvider({ children }) {
    const [isTestCompleted, setIsTestCompleted] = useState(false);
    const value = useMemo(
        () => ({
            isTestCompleted,
            setIsTestCompleted,
        }),
        [isTestCompleted]
    );
    return (
        <TestContext.Provider value={value}>{children}</TestContext.Provider>
    );
}

export const useTestContext = () => useContext(TestContext);
