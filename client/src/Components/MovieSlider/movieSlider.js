import React from "react";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import styled from "styled-components";

import SingleMovieCard from "../SingleMovieCard/singleMovieCard";

const SliderWrapper = styled.div`
  margin: 15px 0px;
`;

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 4, 5, 6, 6, 6, 7, 7];

export default function MovieSlider() {
  return (
    <SliderWrapper>
      <ScrollMenu LeftArrow={<></>} RightArrow={<></>}>
        {items.map((movieObj, index) => (
          <SingleMovieCard key={index} />
        ))}
      </ScrollMenu>
    </SliderWrapper>
  );
}
