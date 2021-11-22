import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import MovieIcon from "../../assets/movie1.png";

const CardWrapper = styled.div`
  width: 320px;
  margin: 10px;
  border-radius: 10px;
`;
const MovieThumbnail = styled.img`
object-fit:cover;
width:100%;
max-height:180px;
border-radius: 10px;
`;
const MovieDetails = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: space-between;
  > h4 {
    margin: 0;
  }
`;
export default function SingleMovieCard({data}) {
  return (
    <CardWrapper>
      <Link to="/watch">
        <MovieThumbnail src={data.thumbnail} alt="Ant man" />
      </Link>
      <MovieDetails>
        <h4>{data.title}</h4>
        {data.completed && <h4>{data.completed}</h4>}
      </MovieDetails>
    </CardWrapper>
  );
}
