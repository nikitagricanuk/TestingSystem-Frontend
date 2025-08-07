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
        dots.push(<div key={i} className="dotsElement" />);
    }

    return (
        <div>
            <div ref={containerRef} className="dotsContainer">
                {dots}
            </div>
        </div>
    );
};

export default Dots;
