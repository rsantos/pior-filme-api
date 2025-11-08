import { initializeApp } from "../app";
import request from "supertest";


describe("Producer", () => {
  let app: any;
  beforeAll(async () => {
    app = await initializeApp({
      seedFilePathCSV: "src/__tests__/fixtures/movielist.csv",
    });
  })

  it("should fetch producers with award intervals", async () => {
    const response = await request(app)
      .get("/producers/award-intervals")
      .accept("application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      min: [
        {
          producer: "Joel Silver",
          interval: 1,
          previousWin: 1990,
          followingWin: 1991
        }
      ],
      max: [
        {
          producer: "Matthew Vaughn",
          interval: 13,
          previousWin: 2002,
          followingWin: 2015
        }
      ]
    });
  });
});
