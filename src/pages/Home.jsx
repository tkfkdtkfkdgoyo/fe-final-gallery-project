import React from 'react';
import styled, { createGlobalStyle } from "styled-components";
import Profile from '../component/Profile';
import Gallery from '../component/Gallery';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: #f2f2f2;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  background-color: white;
`;

const Home = () => {
  return (
    <>
      <GlobalStyles />
      <PageContainer>
        <Profile/>
        <ContentContainer>
          <Gallery />
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default Home;
