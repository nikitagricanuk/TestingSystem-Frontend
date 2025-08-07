import { useEffect, useRef, useState } from "react";

const Dots = ({ size, onSpacingChange }) => {
    const containerRef = useRef(null);
    const [spacing, setSpacing] = useState(0);

    const dotWidth = 5;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateSpacing = () => {
            const containerWidth = container.offsetWidth;
            const totalDotsWidth = size * dotWidth;
            const availableSpace = containerWidth - totalDotsWidth;
            const calculatedSpacing = availableSpace / (size + 1);
            setSpacing(calculatedSpacing);
            if (onSpacingChange) onSpacingChange(calculatedSpacing);
        };

        updateSpacing();

        const observer = new ResizeObserver(updateSpacing);
        observer.observe(container);

        return () => observer.disconnect();
    }, [size, onSpacingChange]);

    const dots = [];

    for (let i = 0; i < size; i++) {
        dots.push(
            <div
                key={i}
                style={{
                    backgroundColor: "#3F82C9",
                    borderRadius: "50%",
                    height: "5px",
                    width: "5px",
                    flexShrink: 0,
                }}
            />
        );
    }

    return (
        <div>
            <div
                ref={containerRef}
                style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100vw",
                    maxWidth: "100%",
                    margin: "0 auto",
                }}
            >
                {dots}
            </div>
        </div>
    );
};

export default Dots;
