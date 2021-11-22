import React from 'react'

import "video-react/dist/video-react.css";
import {
  Player,
  ControlBar,
  PlaybackRateMenuButton,
  ForwardControl,
  ReplayControl,
} from "video-react";

import MovieDetailImage from "../../assets/moviedetail.png";
export default function VideoPlayer() {
    return (
        <Player
              playsInline
              poster={MovieDetailImage}
              controls
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            >
              <ControlBar>
                <ReplayControl seconds={5} order={2.1} />
                <ForwardControl seconds={5} order={3.1} />
                <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
              </ControlBar>
            </Player>
    )
}
