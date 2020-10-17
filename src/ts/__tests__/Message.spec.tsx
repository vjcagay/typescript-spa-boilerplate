import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Message from "../Message";

describe("message", () => {
  test("This is working", () => {
    const { container } = render(<Message />);
    expect(container).toHaveTextContent("Hello World!");
  });
});
