import { server } from "./server";
import fetch from "node-fetch";

beforeAll(() => {
  server.listen();
  window.fetch = fetch as any;
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
