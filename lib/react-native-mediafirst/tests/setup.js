import 'react-native';
import Enzyme from "../src/Components/MFFilmStrip/__tests__/node_modules/enzyme";
import Adapter from "enzyme-adapter-react-16";
/**
 * Set up DOM in node.js environment for Enzyme to mount to
 **/
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);
global.fetch = require("jest-fetch-mock");
Enzyme.configure({ adapter: new Adapter() });