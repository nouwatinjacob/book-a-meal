/* eslint max-len: ["error", { "ignoreStrings": true }] */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocalStorage from './__mockData__/localStorage';
import SessionStorage from './__mockData__/sessionStorage';

Enzyme.configure({
  adapter: new Adapter()
});

const JSON = {
  parse: jest.fn(x => x),
  stringify: jest.fn(x => x)
};

global.localStorage = new LocalStorage();
global.sessionStorage = new SessionStorage();
global.JSON = JSON;
global.catererToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhdGVyZXIxQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiY2F0ZXJlciIsImlkIjoxfQ.y_VS7MDtOQv6QYbGdftXgnsbmbBwcEve8WeiXbaet4I';
global.customerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiY3VzdG9tZXIiLCJpZCI6Mn0.QWrWoSNpCPW49SVu_5ipLf-oTfVGPo5TEmo-L6MWBZo';