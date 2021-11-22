import React from "react";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import styled from "styled-components";

import SingleMovieCard from "../SingleMovieCard/singleMovieCard";

const SliderWrapper = styled.div`
  margin: 15px 0px;
`;


export default function MovieSlider({data}) {
  return (
    <SliderWrapper>
      <ScrollMenu LeftArrow={<></>} RightArrow={<></>}>
        {data.map((movieObj, index) => (
          <SingleMovieCard data={movieObj} key={index+movieObj.id} />
        ))}
      </ScrollMenu>
    </SliderWrapper>
  );
}
