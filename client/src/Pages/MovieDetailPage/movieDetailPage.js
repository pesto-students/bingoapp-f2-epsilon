import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useParams } from "react-router-dom";
import $ from 'jquery'

import MovieSlider from "../../Components/MovieSlider/movieSlider";
import MovieDetail from "../../Components/MovieDetail/movieDetail";
import { movies } from "../../Utilities";
import Loader from "../../Parts/Loader/loader";
import { getSingleMovie,getAllMovies, getPreviouslyWatchedMovies } from "../../Services/apiCalls";
import { useAuth } from "../../Utilities/authContext";

const SliderSection = styled.section`
  text-align: left;
  margin: 20px 0;
`;

const PageWrapper = styled.div`
  max-width: 1127px;
  margin-left: auto !important;
  margin-right: auto !important;
`;

function MovieDetailPage() {
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState("");
  const [moviesData,setMoviesData]=useState([]);

  const { videoId } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    getMovieData()
    getMovies()
  }, [videoId])

  const getMovieData=async()=>{
    const{data,status}=await getSingleMovie({id:videoId})
    if(status===200){
      setMovieData(data.movie)
    }
  }

  const getMovies=async()=>{
    const{data,status}=await getPreviouslyWatchedMovies({email:currentUser.email})
    if(status===200){
      setLoading(false)
      setMoviesData(data)
    }
  }


  const onScroll = (cls) => {
    var $elem = $(cls);
    var newScrollLeft = $elem.scrollLeft(),
      width = $elem.width(),
      scrollWidth = $elem.get(0).scrollWidth;
    var offset = 0;
    if (scrollWidth - newScrollLeft - width < 0.4) {
      getPreviousMoviesNextPage();
    }
  };

  const getPreviousMoviesNextPage =async () => {
    const { hasNextPage, page } = moviesData;
    if (hasNextPage) {
      const { data, status } = await getPreviouslyWatchedMovies({
        email: currentUser.email,
        page:page+1
      });
      if (status === 200) {
        let arr=[...moviesData.docs]
        arr.push(...data.docs)
        const newData={...data,docs:arr}
        console.log('newData',newData)
        setMoviesData(newData);
      } 
    }
  };


  const recommendMovies=moviesData && moviesData.docs?moviesData.docs:[]
  return (
    <PageWrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MovieDetail data={movieData} />
          <SliderSection>
            <h3>Recommended</h3>
            <MovieSlider  
            classname="previous-detail-movies"
            onScroll={() => onScroll(".previous-detail-movies")}
            data={recommendMovies} />
          </SliderSection>
        </>
      )}
    </PageWrapper>
  );
}

export default MovieDetailPage;
