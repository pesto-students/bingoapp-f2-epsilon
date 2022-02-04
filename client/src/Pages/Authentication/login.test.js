// import { render, screen } from "@testing-library/react";
import { shallow,configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-17-updated';
import Login from "./login";

configure({adapter: new Adapter()});
describe("Test case for testing login", () => {
  let wrapper;
  test("email check", () => {
    wrapper = shallow(<Login />);
    wrapper
      .find('input[type="email"]')
      .simulate("change", {
        target: { name: "email", value: "admin@admin.com" },
      });
    expect(wrapper.state("email")).toEqual("admin@admin.com");
  });
  it("password check", () => {
    wrapper = shallow(<Login />);
    wrapper
      .find('input[type="password"]')
      .simulate("change", {
        target: { name: "password", value: "123456" },
      });
    expect(wrapper.state("password")).toEqual("123456");
  });
});
