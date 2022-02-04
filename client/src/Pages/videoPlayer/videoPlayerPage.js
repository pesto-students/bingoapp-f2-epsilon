import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useParams } from "react-router-dom";

import VideoPlayer from "../../Components/VideoPlayer/videoPlayer";
import { movies } from "../../Utilities";
import Loader from "../../Parts/Loader/loader";
import {
  getSingleMovie,
  createPrevoiousWatchedMovies,
} from "../../Services/apiCalls";
import { useAuth } from "../../Utilities/authContext";

const base_url = "http://localhost:8080/";

// styling starts
const PlayerWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
// styling ends

export default function VideoPlayerPage() {
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState("");

  const { videoSlug } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    getMovieData();
  }, [videoSlug]);

  const getMovieData = async () => {
    const { data, status } = await getSingleMovie({ id: videoSlug });
    if (status === 200) {
      setMovieData(data.movie);
      setLoading(false);
      postRecommendMovies(data.movie);
    }
  };

  const postRecommendMovies = async (data) => {
    const req = {
      email: currentUser.email,
      cast: data.cast,
      categories: data.categories.map((x) => x._id),
    };
    const { status } = await createPrevoiousWatchedMovies(req);
  };

  return (
    <PlayerWrapper>
      {loading ? (
        <Loader />
      ) : (
        <VideoPlayer
          src={movieData.video_name}
          auto={true}
          thumbnail={movieData && movieData.image}
        />
      )}
    </PlayerWrapper>
  );
}
