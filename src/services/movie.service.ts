import MovieRepository from '../repositories/movie.repository';
import { Movie } from "../models/movie.model";

export default class MovieService {
  private movieRepository: MovieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  listMovies(): Movie[] {
    return this.movieRepository.findAll();
  }

  listWinners(): Movie[] {
    return this.movieRepository.findWinners();
  }

  createMovie(data: Omit<Movie, 'id'>): Movie {
    return this.movieRepository.create(data);
  }
}