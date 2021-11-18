import React from "react";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import styled from "styled-components";

import MovieIcon  from "../../assets/movie5.webp";

const SliderWrapper = styled.div`
  margin: 15px 0px;
`;
const Card=styled.div`
height:150px;
width:300px;
background-image:url(${MovieIcon});
`;

const Thumbnail=styled.img``;

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 4, 5, 6, 6, 6, 7, 7];

export default function NewMoviesSlider() {
  return (
    <SliderWrapper>
      <ScrollMenu LeftArrow={<></>} RightArrow={<></>}>
        {items.map((movieObj, index) => (
          <Card key={index}/>
        ))}
      </ScrollMenu>
    </SliderWrapper>
  );
}
