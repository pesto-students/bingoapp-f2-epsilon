import React from 'react'

import styled from 'styled-components'

const DefaultButton=styled.button`
cursor:pointer;
outline:none;
min-width:200px;
border-radius:10px;
padding:10px 15px;
color:#000;
border:2px solid #000;
background:transparent;
margin:10px 0;
`;

export default function  Button(props) {
    return (
        <DefaultButton {...props}>{props.name}</DefaultButton>
    )
}
