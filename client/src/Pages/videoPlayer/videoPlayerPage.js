import React from "react";

import styled from "styled-components";
import { useParams } from "react-router-dom";

import VideoPlayer from "../../Components/VideoPlayer/videoPlayer";
import { movies } from "../../Utilities";

// styling starts
const PlayerWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
// styling ends

export default function VideoPlayerPage() {
  const { videoSlug } = useParams();
  const thumbnailUrl = movies.filter((movie) => movie.id === parseInt(videoSlug));
  return (
    <PlayerWrapper>
      <VideoPlayer thumbnail={thumbnailUrl[0].thumbnail}/>
    </PlayerWrapper>
  );
}
