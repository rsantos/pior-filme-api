import { Movie, MovieModel } from "../models/movie.model";

export default class MovieService {
  listMovies(): Movie[] {
    return MovieModel.findAll();
  }

  createMovie(data: Omit<Movie, 'id'>): Movie {
    return MovieModel.create(data);
  }
}