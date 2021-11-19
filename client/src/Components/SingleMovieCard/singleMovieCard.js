import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import MovieIcon from "../../assets/movie1.png";

const CardWrapper = styled.div`
  width: 320px;
  margin: 10px;
  border-radius: 10px;
`;
const MovieThumbnail = styled.img``;
const MovieDetails = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: space-between;
  > h4 {
    margin: 0;
  }
`;
export default function SingleMovieCard() {
  return (
    <CardWrapper>
      <Link to="/watch">
        <MovieThumbnail src={MovieIcon} alt="Ant man" />
      </Link>
      <MovieDetails>
        <h4>Spiderman No way Home</h4>
        <h4>65%</h4>
      </MovieDetails>
    </CardWrapper>
  );
}
