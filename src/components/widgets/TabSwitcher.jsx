const TabsSwitcher = ({
    tabs,
    active,
    onChange,
    style = {},
    tabStyle = {},
}) => {
    return (
        <div
            style={{
                display: "flex",
                gap: "6px",
                backgroundColor: "#F3F3F3",
                borderRadius: "10px",
                padding: "4px",
                marginBottom: "12px",
                ...style,
            }}
        >
            {tabs.map((tab) => {
                const isActive = tab === active;

                return (
                    <button
                        key={tab}
                        onClick={() => onChange(tab)}
                        style={{
                            flex: 1,
                            border: "none",
                            background: isActive ? "#FFFFFF" : "transparent",
                            padding: "6px 0",
                            fontSize: "16px",
                            cursor: "pointer",
                            borderRadius: "8px",
                            color: isActive ? "#000" : "#767676",
                            fontWeight: isActive ? 500 : 400,
                            transition: "all 0.15s ease",
                            ...tabStyle,
                        }}
                    >
                        {tab}
                    </button>
                );
            })}
        </div>
    );
};

export default TabsSwitcher;
