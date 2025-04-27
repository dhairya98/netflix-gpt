import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video h-[700px] pt-[10%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview.slice(0,100)+ "..."}</p>
      <div>
        <button className="bg-white p-4 px-16 text-xl text-black rounded-lg cursor-pointer hover:opacity-80"> ▶ Play</button>
        <button className="mx-2 bg-gray-500/50 p-4 px-12 text-xl text-white rounded-lg cursor-pointer">More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
