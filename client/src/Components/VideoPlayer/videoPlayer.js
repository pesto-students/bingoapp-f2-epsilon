import React from "react";

import "video-react/dist/video-react.css";
import {
  Player,
  ControlBar,
  PlaybackRateMenuButton,
  ForwardControl,
  ReplayControl,
} from "video-react";


export default function VideoPlayer({thumbnail,auto,src}) {
  return (
    <Player
      playsInline
      poster={thumbnail}
      controls
      autoPlay={auto}
      src={src?src:"https://bingo-app.s3.ap-south-1.amazonaws.com/2pHpxyiZf-buck1.mp4"}
    >
      <ControlBar>
        <ReplayControl seconds={5} order={2.1} />
        <ForwardControl seconds={5} order={3.1} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
      </ControlBar>
    </Player>
  );
}
