import React from "react";

import styled from "styled-components";


import CategoryList from "../../Components/CategoryCardList/categoryList";
import MovieSlider from "../../Components/MovieSlider/movieSlider";
import MovieCarousel from "../../Components/MovieCarousel/movieCarousel";
import { movies,previouslyWatchedMovies,carouselImgs } from "../../Utilities"; 

const PageWrapper = styled.div`
  max-width: 1127px;
  margin-left: auto !important;
  margin-right: auto !important;
`;

const HeroSection = styled.section`
  display: flex;
  margin: 0px auto;
  padding: 30px 0;
  @media (max-width:768px) {
    flex-direction:column;
    padding:0px;
  }
`;
const SliderSection = styled.section`
  text-align: left;
  margin: 20px 0;
`;

const SingleColumn = styled.div`
  width: ${props=>props.width?props.width:'50%'};
  @media (max-width:768px) {
    width:100%;
  }
`;

const CategoryHeading = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 30px;
  font-weight: 400;
  > span {
    color: #fdf309;
  }
  @media (max-width:768px) {
    margin-top:30px!important;
  }
`;

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection>
        <SingleColumn width='63%'>
          <MovieCarousel images={movies}/>
        </SingleColumn>
        <SingleColumn width='37%'>
          <CategoryHeading>
            Choose from tons of <span>Categories</span> to Watch
            <CategoryList />
          </CategoryHeading>
        </SingleColumn>
      </HeroSection>
      <SliderSection>
        <h3>Based on previous watch</h3>
        <MovieSlider data={movies} />
        <h3>Based on previous watch</h3>
        <MovieSlider data={previouslyWatchedMovies} />
        <h3>Newly released movies</h3>
        <MovieSlider data={movies} />
      </SliderSection>
    </PageWrapper>
  );
}
