import React from "react";

import styled from "styled-components";

import TwitterIcon from "../../assets/twitter.png";
import FbIcon from "../../assets/fb.png";

const FooterWrapper = styled.footer`
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  max-width: 1127px;
  margin-left: auto!important;
  margin-right: auto!important;
  > p {
    width: 65%;
  }
`;

const FooterSocialSection = styled.div``;

const LabelText = styled.p`
  margin: 0px;
  font-size:16px;
  text-align:left;
`;

const Icon=styled.img`
margin:10px 10px 0px 0px;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <LabelText>
        Copyright @ Epsilon team. All Rights Reserved, Pesto. All contents and
        website codes are copyright of Pesto Epsilon team abd unfair use may
        lead to actions. All rights Reserved.
      </LabelText>
      <FooterSocialSection>
        <LabelText>Contact Us</LabelText>
        <Icon alt="" src={TwitterIcon} />
        <Icon alt="" src={FbIcon} />
      </FooterSocialSection>
    </FooterWrapper>
  );
}
