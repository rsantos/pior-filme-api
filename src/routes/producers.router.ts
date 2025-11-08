import { Router } from "express";
import ProducerController from '../controllers/producers.controller';


const router = Router();

const producerController = new ProducerController();

router.get("/award-intervals", producerController.awardIntervals);

export default router;
