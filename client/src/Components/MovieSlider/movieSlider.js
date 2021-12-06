import React from "react";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import SingleMovieCard from "../SingleMovieCard/singleMovieCard";

const SliderWrapper = styled.div`
  margin: 15px 0px;
`;


export default function MovieSlider({data}) {
  let navigate = useNavigate();

  const onSelectMovie=(event)=>{
    let target=event.target
    if(target.tagName==='IMG'){
      navigate(`/watch/${target.id}`)
      window.scroll({ top: 0, behavior: "smooth" });
    }
  }
  return (
    <SliderWrapper onClick={onSelectMovie}>
      <ScrollMenu  LeftArrow={<></>} RightArrow={<></>}>
        {data.length>0?data.map((movieObj, index) => (
          <SingleMovieCard data={movieObj} key={movieObj._id} />
        )):<p>No data found</p>}
      </ScrollMenu>
    </SliderWrapper>
  );
}
