import { Request, Response } from "express";
import MovieService from '../services/movie.service';
import MovieRepository from "../repositories/movie.repository";
import MovieProducerRepository from "../repositories/movie-producer.repository";
import ProducerRepository from "../repositories/producer.repository";

export default class MovieController {
  private movieService: MovieService;

  constructor() {
    const movieService = new MovieService(
      new MovieRepository(),
      new MovieProducerRepository(),
      new ProducerRepository()
    );
    this.movieService = movieService;
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