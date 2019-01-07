import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import spies from "chai-spies";
import axios from "axios";

configure({ adapter: new Adapter() });

const { JSDOM } = require("jsdom");
const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;
global.window = window;

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

function myAwesomeDebug(wrapper: any) {
  let html = wrapper.html();
  // console.log(html);
  return html;
}

chai.should();
chai.use(spies);
chai.use(chaiEnzyme(myAwesomeDebug));

jest.mock("axios");
