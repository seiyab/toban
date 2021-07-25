import {
  compose,
  DefaultRequestBody,
  MockedRequest,
  ResponseResolver,
  ResponseTransformer,
  rest,
  RestHandler,
  RestRequest,
} from "msw";
import fs from "fs";
import { BASE_PATH } from "@/fetch/openapi";

const stubDir = __dirname + "/../../../stub";

export const handlers = (): RestHandler<
  MockedRequest<DefaultRequestBody>
>[] => [
  rest.get(BASE_PATH + "/*", internalHandler),
  rest.get("*", externalHandler),
];

const internalHandler: ResponseResolver<RestRequest, Ctx> = (req, res, ctx) => {
  const dir = stubDir + "/internal" + req.url.pathname;
  const stubFile = dir + "/index.json";
  return res(respondFile(stubFile, ctx));
};

const externalHandler: ResponseResolver<RestRequest, Ctx> = (req, res, ctx) => {
  const dir = stubDir + "/external" + `/${req.url.hostname}` + req.url.pathname;
  const stubFile = dir + "/index.json";
  return res(respondFile(stubFile, ctx));
};

const respondFile = (stubFile: string, ctx: Ctx): ResponseTransformer => (
  res
) =>
  new Promise((resolve, reject) => {
    fs.readFile(stubFile, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(compose(ctx.status(200), ctx.json(JSON.parse(data)))(res));
      }
    });
  });

type Ctx = any;
