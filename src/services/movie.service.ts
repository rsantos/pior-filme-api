import { Movie } from "../models/movie.model";
import MovieProducerRepository from '../repositories/movie-producer.repository';
import MovieRepository from '../repositories/movie.repository';
import ProducerService from './producer.service';

interface CreateMovieDTO {
  id?: number;
  year: number;
  title: string;
  studios: string;
  producers?: string;
  winner: boolean;
}

export default class MovieService {
  private movieRepository: MovieRepository;
  private movieProducerRepository: MovieProducerRepository;
  private producerService: ProducerService;

  constructor() {
    this.movieRepository = new MovieRepository();
    this.movieProducerRepository = new MovieProducerRepository();
    this.producerService = new ProducerService();
  }

  listMovies(): Movie[] {
    return this.movieRepository.findAll();
  }

  listWinners(): Movie[] {
    return this.movieRepository.findWinners();
  }

  createMovie(data: CreateMovieDTO): Movie {
    const movie = this.movieRepository.create(data as Omit<CreateMovieDTO, 'producers'>);
    const producers = data.producers ? this.producerService.createManyProducers(data.producers) : [];
    this.movieProducerRepository.attachProducersToMovie(movie.id!, producers.map(p => p.id!));
    return movie;
  }
}