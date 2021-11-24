import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import Login from "./login";

// test("Render Login Page", () => {
//   render(<Login />);
//   expect(screen.getByTestId("login")).toBeEnabled();
// });

let wrapper;

test("email check", () => {
  render(<Login />);
  expect(screen.getByPlaceholderText("Email")).simulate("change",{ value: "admin@admin.com" });
});
