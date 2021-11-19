import React from "react";

import styled from "styled-components";


import CategoryList from "../../Components/CategoryCardList/categoryList";
import MovieSlider from "../../Components/MovieSlider/movieSlider";
import NewMoviesSlider from "../../Components/NewMoviesSlider/newMoviesSlider";

const PageWrapper = styled.div`
  max-width: 1127px;
  margin-left: auto !important;
  margin-right: auto !important;
`;

const HeroSection = styled.section`
  display: flex;
  margin: 0px auto;
  padding: 30px 0;
`;
const SliderSection = styled.section`
  text-align: left;
  margin: 20px 0;
`;

const SingleColumn = styled.div`
  width: 50%;
`;

const CategoryHeading = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 30px;
  font-weight: 400;
  > span {
    color: #fdf309;
  }
`;

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection>
        <SingleColumn></SingleColumn>
        <SingleColumn>
          <CategoryHeading>
            Choose from tons of <span>Categories</span> to Watch
            <CategoryList />
          </CategoryHeading>
        </SingleColumn>
      </HeroSection>
      <SliderSection>
        <h3>Based on previous watch</h3>
        <MovieSlider />
        <h3>Based on previous watch</h3>
        <MovieSlider />
        <h3>Newly released movies</h3>
        <NewMoviesSlider />
      </SliderSection>
    </PageWrapper>
  );
}
