import React, { useState } from "react";

import styled from "styled-components";

import Input from "../Input/input";
import Button from "../Button/button";
import { set } from "lodash";
import { addNewCategory } from "../../Services/apiCalls";

const FormWrapper = styled.div`
  margin: 20px 0;
  min-width: 300px;
`;
const Header = styled.h3``;
export default function NewCtegory() {
  const [name, setName] = useState("");

  const onInputChange=(e)=>{
      setName(e.target.value)
  }

  const onSubmit=async()=>{
    if(!name)
    return;
    const{data,status}=await addNewCategory({name})
  }

  return (
    <FormWrapper>
      <Header>Add new category</Header>
      <Input
        value={name}
        onChange={onInputChange}
        name="name"
        placeholder="Enter category name"
      />
      <Button onClick={onSubmit} name="Submit" />
    </FormWrapper>
  );
}
