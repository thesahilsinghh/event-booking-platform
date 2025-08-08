// src/components/CustomButton.jsx
import React from "react";

const CustomButton = ({ onClick, children, color = "blue", className = "" }) => {
    const baseColor = {
        blue: "bg-blue-600 hover:bg-blue-700",
        green: "bg-green-600 hover:bg-green-700",
        red: "bg-red-600 hover:bg-red-700",
        gray: "bg-gray-600 hover:bg-gray-700",
    };

    return (
        <button
            onClick={onClick}
            className={`text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all duration-200 ${baseColor[color]} ${className}`}
        >
            {children}
        </button>
    );
};

export default CustomButton;
