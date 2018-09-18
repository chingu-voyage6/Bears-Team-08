// import { mock, instance, verify, when, reset, anything } from "ts-mockito";
// import * as Koa from "koa";
// import * as request from "supertest";
// import { Server, IncomingMessage, ServerResponse } from "http";
// import { Http2ServerResponse, Http2ServerRequest } from "http2";

// import { Role, CreateUserJSON } from "../entities";
// import { ModuleFn, Router } from ".";

// import { userModule, userRouter } from "./users";
// import { UserController } from "./users/controller";
// import { UserManager } from "../managers";
// import { Authenticator, JWTAuthenticator } from "../lib/authentication";

// import { users } from "../testUtil";

// describe("User application", () => {
//   let MockManager: UserManager;
//   let MockAuthenticator: Authenticator;
//   let router: Router;
//   let app: Koa;
//   let server: Server;
//   // let server: (
//   //   res: IncomingMessage | Http2ServerResponse,
//   //   req: ServerResponse | Http2ServerRequest
//   // ) => void;
//   beforeAll(async () => {
//     MockManager = mock(UserManager);
//     MockAuthenticator = mock(JWTAuthenticator);

//     const manager = instance(MockManager);
//     const cntrl = new UserController(MockManager);
//     const jwtAuth = instance(MockAuthenticator);
//     router = userRouter(cntrl, jwtAuth);
//     app = new Koa();
//     app.use(router.routes());
//     server = app.listen(10000);
//   });

//   afterAll(() => {
//     [MockManager, MockAuthenticator].map(reset);
//     server.close();
//   });

//   describe("GET /", () => {
//     it("should be able to get a list of users", async () => {
//       // when(MockManager.findUsers(anything)).thenResolve(user);
//     });
//   });

//   describe("POST /", () => {
//     it("should be able to create a new user with valid credentials", async () => {
//       const user = users[0];
//       when(MockManager.findByUsername(user.username)).thenResolve(user);
//       const res = await request(app.callback)
//         .get("/")
//         .send({ username: "jack", password: "shh" } as CreateUserJSON);
//       expect(res.status).toEqual(201);
//       expect(res.body).toEqual({ a: "a" });
//     });
//   });

//   describe("PUT /", () => {
//     it("should allow logged in user to change there information", () => {});
//   });

//   describe("POST /login", () => {
//     it("should be able to log a user in", () => {});
//     it("should reject on invalid user login", () => {});
//   });

//   describe("GET /me", () => {
//     it("should be able to logged inusers information", () => {});
//   });

//   describe("PUT /password", () => {
//     it("should change the users password when given the old password and a valid new password", () => {});
//   });

//   describe("DELETE /:id", () => {
//     it("should delete a user with valid credentials", () => {});
//   });
// });
