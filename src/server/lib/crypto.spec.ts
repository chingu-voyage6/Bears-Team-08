import * as Crypto from "./crypto";

test("uuidv4() should generate a string 36 charactors long", () => {
  expect(Crypto.uuidv4().length).toEqual(36);
});

describe("BCryptHasher", () => {
  const hasher = new Crypto.BCryptHasher(8);

  it("should be able to hash a password correctly", async () => {
    const hash = await hasher.hashPassword("shh");
    expect(hash).not.toEqual("shh");
    expect(hasher.verifyPassword("shh", hash)).toBeTruthy();
  });

  it("should generate a hash 60 charactors long", async () => {
    const hash = await hasher.hashPassword("shh");
    expect(hash.length).toEqual(60);
  });

  it("should take longer with higher difficulty", async () => {
    const easy = new Promise<number>(async resolve => {
      const hasher = new Crypto.BCryptHasher(8);
      const start = new Date();
      await hasher.hashPassword("shh");
      const end = new Date();
      resolve(end.getTime() - start.getTime());
    });

    const hard = new Promise<number>(async resolve => {
      const hasher = new Crypto.BCryptHasher(10);
      const start = new Date();
      await hasher.hashPassword("shh");
      const end = new Date();
      resolve(end.getTime() - start.getTime());
    });

    expect(await hard).toBeGreaterThan(await easy);
  });
});

// test("BCryptHasher/hashPassword should")
// describe("BCryptHash", () => {
//   it("should ");
// });
