import React from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { categories } from "../../Utilities";

const Button =  styled.button`
  background: linear-gradient(180deg, #3c3c43 0%, rgba(60, 60, 67, 0) 100%);
  box-shadow: 4px 4px 19px #ffffff;
  outline: none;
  color: #fff;
  padding: 12px 18px;
  border: 0px;
  font-size: 20px;
  width: 45%;
  margin: 10px;
  text-transform:capitalize;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: auto;
    box-shadow: 4px 4px 19px #aea9a9;
  }
`;

const ButtonsGrid = styled.div`
  display: flex;
  margin: 15px 0px;
  flex-wrap: wrap;
  align-items: center;
  justify-content:flex-start;
`;

export default function CategoryList({list}) {
  let navigate = useNavigate();

  const onSelectCategories = (event) => {
    let target = event.target;
    if (target.tagName === "BUTTON") {
      navigate(`/search/categories/${target.id}`);
    }
  };
  return (
    <ButtonsGrid onClick={onSelectCategories}>
      {list.length>0?list.map((obj) => (
        <Button key={obj._id} id={obj.name}>
          {obj.name}
        </Button>
      )):<p>No data found</p>}
    </ButtonsGrid>
  );
}
