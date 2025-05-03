import React from "react";

const ShimmeringCards = () => {
  return (
    <div className="p-4 m-4 bg-black text-white opacity-90">
      <div className="h-6 w-32 bg-[#2a2a2a] mb-4 rounded animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="w-full h-64 bg-[#1f1f1f] rounded-lg animate-pulse"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default ShimmeringCards;
