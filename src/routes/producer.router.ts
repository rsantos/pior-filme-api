import { Router } from "express";


const router = Router();

router.get("/award-intervals", (_req, res) => {
  res
    .json({
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
    })
    .status(200);
});

export default router;
