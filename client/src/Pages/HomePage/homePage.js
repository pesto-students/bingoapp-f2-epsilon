import React from "react";

import styled from "styled-components";

import Footer from "../../Parts/Footer/footer";
import CategoryList from "../../Components/CategoryCardList/categoryList";

const HeroSection = styled.section`
  background: linear-gradient(
    180deg,
    #302f33 4.09%,
    #4a4a54 26.04%,
    rgba(111, 112, 128, 0.93) 48.96%,
    rgba(94, 94, 114, 0.540918) 70.31%,
    rgba(191, 192, 223, 0) 100%
  );
  min-height: 100vh;
  display: flex;
  margin: 0px auto;
  padding: 30px;
`;

const SingleColumn = styled.div`
  width: 50%;
`;

const CategoryHeading = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 30px;
  font-weight: 400;
  > span {
    color: #fdf309;
  }
`;

export default function HomePage() {
  return (
    <>
      <HeroSection>
        <SingleColumn></SingleColumn>
        <SingleColumn>
          <CategoryHeading>
            Choose from tons of <span>Categories</span> to Watch
            <CategoryList />
          </CategoryHeading>
        </SingleColumn>
      </HeroSection>
      <Footer />
    </>
  );
}
