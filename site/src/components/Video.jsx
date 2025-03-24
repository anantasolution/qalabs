import React, { useState } from "react";
import { Play } from "lucide-react";
import programmersWorkLateAtNight from "../assets/programmers-work-late-at-night.jpg";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const closeVideo = () => {
    setIsPlaying(false);
  };

  const VideoOverlay = () => (
    <div className="absolute flex flex-col items-center justify-center bg-black/20 w-full h-full overflow-hidden">
      <div className="bg-zinc-950/50 py-4 md:py-10 px-4 flex flex-col items-center">
        {/* Animated Button Container */}
        <div
          className="relative flex items-center justify-center"
          onClick={() => setIsPlaying(true)}
        >
          {/* Pulsating Effect */}
          <div className="pulsating-circle"></div>
          <div className="pulsating-circle1"></div>
          <div className="pulsating-circle2"></div>

          {/* Play Button */}
          <div className="pulsating-dot cursor-pointer relative z-10 hover:bg-emerald-400">
            <Play className="w-10 h-10 text-emerald-400 hover:text-black" />
          </div>
        </div>

        <h2 className="text-xl md:text-4xl mt-6 text-center max-w-2xl text-white">
          <span className="text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text font-normal">
            Drive Growth
          </span>{" "}
          with Innovative and <br /> Strategic Solutions
        </h2>
      </div>
    </div>
  );

  return (
    <div className="relative w-full md:w-full h-[250px] md:h-[350px] overflow-hidden">
      {/* Top Half (Color: #151515) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#151515]"></div>

      {/* Bottom Half (Color: #242424) */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#242424]"></div>

      {/* Video Container (Centered) */}
      <div className="absolute inset-0 flex justify-center items-center z-50">
        <div className="relative w-full px-2 md:w-3/4 h-full rounded-xl overflow-hidden">
          {isPlaying ? (
            <>
              <iframe
                src="https://www.youtube.com/embed/Mtjatz9r-Vc?autoplay=1"
                title="YouTube video player"
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                className="absolute top-4 right-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                onClick={closeVideo}
              >
                X
              </button>
            </>
          ) : (
            <div
              className="relative flex justify-center items-center w-full h-full rounded-xl overflow-hidden"
              style={{
                backgroundImage: `url(${programmersWorkLateAtNight})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <VideoOverlay />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;
