import React from "react";

const ShimmerUI = () => {
  return (
    <div className="bg-black min-h-screen text-white space-y-10 py-6 px-4">
      <div className="w-full h-60 md:h-80 bg-[#1f1f1f] rounded-xl animate-pulse" />
      {Array(5)
        .fill("")
        .map((_, rowIndex) => (
          <div key={rowIndex} className="space-y-3">
            <div className="h-6 w-32 bg-[#2a2a2a] rounded animate-pulse" />
            <div className="flex space-x-4 overflow-hidden">
              {Array(6)
                .fill("")
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-36 h-52 bg-[#1f1f1f] rounded-lg animate-pulse"
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShimmerUI;
