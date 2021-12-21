import React, { useState } from "react";

import styled from "styled-components";

import Input from "../Input/input";
import Button from "../Button/button";
import { set } from "lodash";
import { addNewCategory } from "../../Services/apiCalls";
import Alert from "react-s-alert";

const FormWrapper = styled.div`
  margin: 20px 0;
  min-width: 300px;
`;
const Header = styled.h3``;
export default function NewCtegory(props) {
  const [name, setName] = useState("");

  const onInputChange=(e)=>{
      setName(e.target.value)
  }

  const onSubmit=async()=>{
    if(!name)
    return;
    const{data,status}=await addNewCategory({name})
    if(status===200 || status===201){
      Alert.success(data.message, {
        position: "top-right",
        effect: "slide",
        beep: false,
        timeout: 2000,
        offset: 0,
      });
        props.success()
    }
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
