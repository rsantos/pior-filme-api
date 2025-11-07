import request from "supertest";
import app from "../app";


describe("Producer", () => {
  it("should fetch producers with award intervals", async () => {
    const response = await request(app)
      .get("/producers/award-intervals")
      .accept("application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      min: [
        {
          producer: "Joel Silver",
          interval: 8,
          previousWin: 1990,
          followingWin: 1998,
        },
        {
          producer: "Matthew Vaughn",
          interval: 8,
          previousWin: 2002,
          followingWin: 2010,
        },
      ],
      max: [
        {
          producer: "Mark Wahlberg",
          interval: 13,
          previousWin: 1997,
          followingWin: 2010,
        },
      ],
    });
  });
});
