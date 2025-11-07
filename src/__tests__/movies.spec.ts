import { initializeApp } from "../app";
import request from "supertest";

describe("Movies", () => {
  let app: any;
  beforeAll(async () => {
    app = await initializeApp();
  });

  it("should fetch the list of movies", async () => {
    const response = await request(app)
      .get("/movies")
      .accept("application/json");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});