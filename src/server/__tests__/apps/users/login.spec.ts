// import * as supertest from "supertest";

// import { testServer, shutdown, createUserTest } from "../../utils";

describe("POST /api/v1/users/login", async () => {
  //   beforeEach(async () => {
  //     await createUserTest({
  //       email: "example@gmail.com",
  //       firstName: "jack",
  //       lastName: "rabbit",
  //       password: "password"
  //     });
  //   });

  it("Should return a valid token", async () => {
    //     // const res = await supertest(testServer)
    //     //   .post("/api/v1/users/login")
    //     //   .send({ email: "example@gmail.com", password: "password" })
    //     //   .expect(200);
    //     const res = {
    //       body: { msg: "ok" }
    //     };
    //     expect(res.body).toContain(["accessToken"]);
  });

  it("Should return 400 when missing password", async () => {
    //     // const res = await supertest(testServer)
    //     //   .post("/api/v1/users/login")
    //     //   .send({ email: "example@gmail.com" })
    //     //   .expect(400);
    //     const res = {
    //       body: {
    //         message: "rawr"
    //       }
    //     };
    //     expect(res.body.message).toEqual('"password" is required');
  });
});

// describe("i dunno", async () => {
//   beforeAll(async () => {});

//   afterAll(async () => {
//     await shutdown();
//   });

//   test("1 + 2 = 3", () => {
//     expect(1 + 2).toEqual(3);
//   });
// });

// before(async function() {
//   this.timeout(5000);
// });

// after(async () => {
//   const shutdowns = [
//     async () => (await appServer).close(),
//     async () => (await database).close()
//   ];

//   for (const s of shutdowns) {
//     try {
//       await s;
//     } catch (e) {
//       console.error("Error in graceful shutdown:", e);
//     }
//   }
// });
