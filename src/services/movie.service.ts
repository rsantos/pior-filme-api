import { Movie, MovieModel } from "../models/movie.model";

export default class MovieService {
  listMovies(): Movie[] {
    return MovieModel.findAll();
  }

  listWinners(): Movie[] {
    return MovieModel.find('winner = ?', [1]);
  }

  createMovie(data: Omit<Movie, 'id'>): Movie {
    return MovieModel.create(data);
  }
}