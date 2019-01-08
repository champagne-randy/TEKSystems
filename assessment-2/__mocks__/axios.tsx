import MockAdapter from "axios-mock-adapter";
import * as Promise from "bluebird";
import rooms from "./room.data.json";
import { BACKEND_BASE_URL } from "../src/Constants";

const ROOMS_ENDPOINT = new URL("/rooms", BACKEND_BASE_URL);
const REQUESTS_ENDPOINT = new URL("/requests", BACKEND_BASE_URL);

// const axios = require("axios");
// const axiosInstance = axios.create({ baseURL: BACKEND_BASE_URL });
// const mockAPI = new MockAdapter(axiosInstance, { delayResponse: 2000 });
//
// mockAPI.onGet("rooms").reply(200, {
//   data: rooms
// });
//
// export default mockAPI;

module.exports = {
  get: jest.fn(url => {
    if (url === `${ROOMS_ENDPOINT}`) {
      return Promise.resolve({
        data: rooms
      });
    }
  }),
  post: jest.fn((url, requests) => {
    if (url === `${REQUESTS_ENDPOINT}`) {
      return Promise.resolve({
        data: requests
      });
    }
  }),
  create: jest.fn(function() {
    return this;
  }),
  CancelToken: {
    source: jest.fn(() => new AbortController())
  }
};
