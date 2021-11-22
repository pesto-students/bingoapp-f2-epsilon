import React from "react";

import styled from "styled-components";

const Button = styled.button`
  background: linear-gradient(180deg, #3c3c43 0%, rgba(60, 60, 67, 0) 100%);
  box-shadow: 4px 4px 19px #ffffff;
  outline: none;
  color: #fff;
  padding: 12px 18px;
  border: 0px;
  font-size: 20px;
  width: 45%;
  margin: 10px;
  &:hover{
    opacity:0.8;
    cursor:pointer;
  }
  @media (max-width:768px) {
    width:auto;
    box-shadow:4px 4px 19px #aea9a9;
  }
`;

const ButtonsGrid = styled.div`
display:flex;
margin:15px 0px;
flex-wrap:wrap;
align-items:center;
justify-content:center;
`;

export default function CategoryList() {
  return (
    <ButtonsGrid>
      <Button>Horror</Button>
      <Button>Comedy werwer</Button>
      <Button>Horror</Button>
      <Button>Comedy</Button>
      <Button>Horror</Button>
      <Button>Comedy</Button>
    </ButtonsGrid>
  );
}
