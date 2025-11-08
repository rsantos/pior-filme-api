import { Request, Response } from "express";
import MovieService from '../services/movie.service';

export default class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  index = (_: Request, res: Response): void => {
    const movies = this.movieService.listMovies();
    res.status(200).json(movies);
  }

  winners = (_: Request, res: Response): void => {
    const movies = this.movieService.listWinners();
    res.status(200).json(movies);
  }
}