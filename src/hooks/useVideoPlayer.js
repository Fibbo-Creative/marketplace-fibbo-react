import { useState, useEffect } from "react";

const useVideoPlayer = (videoId) => {
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    const video = document.getElementById(videoId);

    // state setters wrappers
    const setAudioData = () => {
      setDuration(video.duration);
      setCurTime(video.currentTime);
    };

    const setAudioTime = () => setCurTime(video.currentTime);

    // DOM listeners: update React state on DOM events
    video.addEventListener("loadeddata", setAudioData);

    video.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? video.play() : video.pause();

    isMuted ? (video.muted = true) : (video.muted = false);

    if (clickedTime && clickedTime !== curTime) {
      video.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      video.removeEventListener("loadeddata", setAudioData);
      video.removeEventListener("timeupdate", setAudioTime);
    };
  });

  return {
    curTime,
    duration,
    playing,
    isMuted,
    setPlaying,
    setIsMuted,
    setClickedTime,
  };
};

export default useVideoPlayer;
