import { Icon } from "@iconify/react";
import React, { useRef } from "react";
import moment from "moment";
import useVideoPlayer from "../hooks/useVideoPlayer";
import momentDurationFormatSetup from "moment-duration-format";

export const VideoPlayer = ({ videoId, video }) => {
  const {
    curTime,
    duration,
    playing,
    isMuted,
    setPlaying,
    setIsMuted,
    setClickedTime,
  } = useVideoPlayer(videoId);

  const curPercentage = (curTime / duration) * 100;

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.getElementById(videoId);
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    setClickedTime(calcClickedTime(e));

    const updateTimeOnMove = (eMove) => {
      setClickedTime(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  function formatDuration(duration) {
    return moment.duration(duration, "seconds").format("mm:ss", {
      trim: false,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <video id={videoId}>
        <source src={video} />
        Your browser does not support the <code>video</code> element
      </video>

      <div
        className="flex items-center space-evenly py-3 gap-2 px-4 shadow-lg drop-shadow-xl backdrop-blur-lg rounded-lg"
        style={{ background: "rgba(255, 255, 255, 0.25)" }}
      >
        <div className="flex">
          {playing ? (
            <Icon
              width={32}
              icon="carbon:pause-outline-filled"
              onClick={() => setPlaying(false)}
            />
          ) : (
            <Icon
              width={32}
              icon="carbon:play-filled"
              onClick={() => setPlaying(true)}
            />
          )}
        </div>

        <div className="flex items-center w-full gap-2">
          <div
            id="bar__progress"
            className="flex-1 h-[10px] bg-white flex items-center rounded-lg"
            style={{
              background: `linear-gradient(to right, var(--primary) ${curPercentage}%, var(--progress) 0)`,
            }}
            onMouseDown={(e) => handleTimeDrag(e)}
          >
            <span
              className="relative h-[16px] w-[16px] rounded-full border-[1.5px] border-white"
              style={{
                left: `${curPercentage - 2}%`,
                backgroundColor: "var(--primary)",
              }}
            ></span>
          </div>
        </div>
        <span className="bar__time">
          {playing || curTime > 0
            ? formatDuration(curTime)
            : formatDuration(duration)}
        </span>
        {isMuted ? (
          <Icon
            width={20}
            icon="carbon:volume-mute-filled"
            onClick={() => setIsMuted(false)}
          />
        ) : (
          <Icon
            width={20}
            icon="carbon:volume-up-filled"
            onClick={() => setIsMuted(true)}
          />
        )}
      </div>
    </div>
  );
};