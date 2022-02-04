import React from 'react'

import styled from 'styled-components'

const DefaultInput=styled.input`
background:#f3f3f3;
border-radius: 128px;
border: 0px;
padding: 12px 20px;
outline: none;
width: -webkit-fill-available;
font-weight: 500;
font-size: 16px;
display:block;
line-height: 22px;
color:#000;
margin:10px 0;
::placeholder,
::-webkit-input-placeholder {
  color:#bcbcbc;
}
:-ms-input-placeholder {
   color:#bcbcbc;
}
`;

export default function  Input(props) {
    return (
        <DefaultInput {...props}/>
    )
}
