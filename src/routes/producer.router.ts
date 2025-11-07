import { Router } from "express";


const router = Router();

router.get("/award-intervals", (_req, res) => {
  res
    .send("Lista os produtores que tiveram o maior e o menor intervalo entre prêmios.")
    .status(200);
});

export default router;
