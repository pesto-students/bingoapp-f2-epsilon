import React from "react";

import styled from "styled-components";

const Label = styled.label`
  color: red;
  font-size: 12px;
  margin: 0;
  text-transform: capitalize;
`;

export default function ErrorField({ err }) {
  return <Label>{err}</Label>;
}
