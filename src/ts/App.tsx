import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

// Import fonts manually since styled-components does not support bundling
import InterRegular from "../fonts/Inter-Regular.ttf";
import InterBold from "../fonts/Inter-Bold.ttf";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: "Inter";
    font-weight: regular;
    src: url(${InterRegular});
    font-display: fallback;
  }

  @font-face {
    font-family: "Inter";
    font-weight: bold;
    src: url(${InterBold});
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
