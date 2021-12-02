import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useParams } from "react-router-dom";

import VideoPlayer from "../../Components/VideoPlayer/videoPlayer";
import { movies } from "../../Utilities";
import Loader from "../../Parts/Loader/loader";
import { getSingleMovie } from "../../Services/apiCalls";

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
  useEffect(() => {
    getMovieData()
  }, [videoSlug])

  const getMovieData=async()=>{
    const{data,status}=await getSingleMovie({id:videoSlug})
    if(status===200){
      setMovieData(data.movie)
      setLoading(false)
    }
  }

  return (
    <PlayerWrapper>
      {loading?<Loader/>:<VideoPlayer thumbnail={movieData&&movieData.image}/>}
    </PlayerWrapper>
  );
}
