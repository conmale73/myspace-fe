import React, { useEffect, useRef, useState } from "react";
import "./AnimatedText.scss";

const AnimatedText = (props) => {
    const [text, setText] = useState("");
    const textRef = useRef(null);
    const fullText = props.text; // Replace with your desired text

    useEffect(() => {
        let currentText = "";
        let i = 0;

        const typeText = () => {
            if (i < fullText.length) {
                currentText += fullText.charAt(i);
                setText(currentText);
                i++;
                setTimeout(typeText, 150); // Adjust typing speed here (in milliseconds)
            }
        };

        typeText();
    }, []);

    return (
        <div className="typing-text-container">
            <div ref={textRef} className="typing-text">
                {text}
            </div>
        </div>
    );
};

export default AnimatedText;
