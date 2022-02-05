import React from "react";
import { hydrate, render } from "react-dom";

import App from "./App";

const rootElement = document.getElementById("app");

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}