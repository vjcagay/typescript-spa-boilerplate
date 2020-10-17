import React from "react";
import styled from "styled-components";

const MessageStyled = styled.div`
  margin: auto;
  padding: 3em;

  img {
    width: 75%;
  }

  h1 {
    margin: 1em 0;
    font-size: 2.5em;
    font-weight: bold;
  }

  p {
    line-height: 1.5;
  }
`;

const MessageComponent = () => (
  <MessageStyled>
    <img src="https://64.media.tumblr.com/a8d91d9d6f197e126351464305f75dd7/tumblr_msitq5qMwW1sg2d49o1_1280.gif" />
    <br />
    <h1>Hello World!</h1>
    <p>You can now start building your application with TypeScript.</p>
    <br />
    <p>Happy coding!</p>
  </MessageStyled>
);

export default MessageComponent;
