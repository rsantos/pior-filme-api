import { Movie, MovieModel } from "../models/movie.model";

export default class MovieService {
  static listMovies(): Movie[] {
    return MovieModel.findAll();
  }

  static createMovie(data: Omit<Movie, 'id'>): Movie {
    return MovieModel.create(data);
  }
}