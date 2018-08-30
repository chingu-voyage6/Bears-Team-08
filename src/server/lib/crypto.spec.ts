import * as Crypto from "./crypto";

describe("uuidv4", () => {
  it("should generate a string 36 charactors long", () => {
    expect(Crypto.uuidv4().length).toEqual(36);
  });
});
