import React from "react";

import styled from "styled-components";

import Input from "../Input/input";
import ErrorField from "../ErrorField/errorField";
// styling starts
const GroupWrapper = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.label`
  font-weight: 500;
  display: block;
`;
const FormLabel = styled(Label)`
  font-size: 16px;
  line-height: 22px;
  color: #202020;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// styling ends

export default function InputGroup({ name, input, err }) {
  return (
    <GroupWrapper>
      <FormLabel>{name}</FormLabel>
      <Input {...input} />
      {err && <ErrorField err={err} />}
    </GroupWrapper>
  );
}
