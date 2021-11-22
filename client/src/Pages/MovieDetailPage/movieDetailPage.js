import React from "react";

import styled from "styled-components";

import MovieSlider from "../../Components/MovieSlider/movieSlider";
import MovieDetail from "../../Components/MovieDetail/movieDetail";
import { movies } from "../../Utilities";

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
  return (
    <PageWrapper>
      <MovieDetail />
      <SliderSection>
        <h3>Recommended</h3>
        <MovieSlider data={movies} />
      </SliderSection>
    </PageWrapper>
  );
}

export default MovieDetailPage;
