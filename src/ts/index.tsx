import * as React from "react";
import * as ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

// Import fonts manually since styled-components does not support bundling
import "../fonts/Roboto-Regular.ttf";

import Message from "./Message";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: "Roboto";
    src: url("./Roboto-Regular.ttf");
    font-display: fallback;
  }

  body {
    font-family: "Roboto";
    font-size: 2em;
    text-align: center;
  }
`

const App = () => (
  <>
    <GlobalStyle />
    <Message />
  </>
)

ReactDOM.render(<App />, document.getElementById("app"));
