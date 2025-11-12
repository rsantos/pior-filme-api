import { initializeApp } from "../app";
import request from "supertest";

describe("Movies", () => {
  let app: any;
  beforeAll(async () => {
    app = await initializeApp({
      seedFilePathCSV: "src/__tests__/fixtures/database.csv",
    });
  });

  it("should fetch the list of movies", async () => {
    const response = await request(app)
      .get("/movies")
      .accept("application/json");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch the list of winning movies", async () => {
    const response = await request(app)
      .get("/movies/winners")
      .accept("application/json");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(45);
  });
});