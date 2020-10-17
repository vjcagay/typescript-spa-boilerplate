import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

// Import fonts manually since styled-components does not support bundling
import "../fonts/Inter-Regular.ttf";
import "../fonts/Inter-Bold.ttf";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: "Inter";
    font-weight: regular;
    src: url("./Inter-Regular.ttf");
    font-display: fallback;
  }

  @font-face {
    font-family: "Inter";
    font-weight: bold;
    src: url("./Inter-Bold.ttf");
    font-display: fallback;
  }

  body {
    font-family: "Inter";
    text-align: center;
    background-color: #00273f;
    color: #ffffff;
  }
`;

const RootDiv = styled.div`
  height: 100vh;
  height: -webkit-fill-available;
  display: grid;
`;

import Message from "./Message";

const App = () => (
  <RootDiv>
    <GlobalStyle />
    <Message />
  </RootDiv>
);

export default App;
