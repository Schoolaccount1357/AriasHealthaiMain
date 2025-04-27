
import React from 'react';

interface USMapProps {
  selectedState: string;
  onStateSelect: (state: string) => void;
}

export const USMap: React.FC<USMapProps> = ({ selectedState, onStateSelect }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <svg
        viewBox="0 0 959 593"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Add state paths here - I'll include a few examples */}
        <path
          d="M874.7 178.5l0.4-1.1-1.3-0.2-2.3-1.2-2.4-3.5-2.4-5.5-1.8-2.4-2-1.8-0.5-2.3-1.8-1.9-0.3-2.4 0.6-2.3 0.3-2.4-0.2-2.1 1.5-2.1 2.1-1.6 1.9-2.1-0.2-1.6-1.6-1.5-1.5 0-1.9-0.5-2.4-1.1-2.3-0.8-2.4-1.1-1.8-1.1-2.3-1.9-1.8-1.1-1.3-1.1-0.8-1.6-0.2-1.6-0.3-1.5-1-1.3-1.5-1.3-1.1-0.5-1.6-0.3-1.5-1.3-0.2-1.6 0.6-1.1 1.1-1.1 1.3-1.5-0.2-2.1-0.8-2.4-1.1-2.3-1.5-2.1-1.6-1.6-1.5-1.6-1.3-2.1-0.8-2.3-0.5-1.6-0.5-2.3-0.3-2.4 0.2-2.3 0.6-2.3 0.8-2.3 1.1-2.1 1.3-1.8 1.6-1.6 1.8-1.3 2.1-0.8 2.3-0.3 2.3 0.2 2.4 0.5 2.3 0.8 2.1 1.1 1.8 1.3 1.6 1.6 1.3 1.8 1.1 2.1 0.8 2.3 0.3 2.4 0 2.3-0.3 2.4-0.6 2.3-0.8 2.3-1.1 2.1-1.3 1.8-1.6 1.6-1.8 1.3-2.1 0.8-2.3 0.3-2.3-0.2-2.4-0.5-2.3-0.8-2.1-1.1-1.8-1.3-1.6-1.6-1.3-1.8z"
          className={`cursor-pointer transition-colors ${
            selectedState === "New York"
              ? "fill-[#3e64dd]"
              : "fill-[#1c2537] hover:fill-[#3e64dd]/70"
          }`}
          onClick={() => onStateSelect("New York")}
        />
        {/* Add more state paths similarly */}
      </svg>
    </div>
  );
};
