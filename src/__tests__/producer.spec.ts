import request from "supertest";
import app from "../app";


describe("Producer", () => {
  it("should fetch producers with award intervals", async () => {
    const response = await request(app).get("/producers/award-intervals");
    expect(response.status).toBe(200);
  });
});