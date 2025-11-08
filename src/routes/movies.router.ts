import { Router } from "express";
import MovieController from '../controllers/movies.controller';


const router = Router();

const movieController = new MovieController();

router.get('/', movieController.index)
router.get('/winners', movieController.winners);

export default router;