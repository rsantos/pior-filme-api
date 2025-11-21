import { Producer } from "src/models/producer.model";
import { Movie } from "../models/movie.model";
import MovieProducerRepository from '../repositories/movie-producer.repository';
import MovieRepository from '../repositories/movie.repository';
import ProducerRepository from '../repositories/producer.repository';

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
  private producerRepository: ProducerRepository;

  constructor(
    movieRepository: MovieRepository,
    movieProducerRepository: MovieProducerRepository,
    producerRepository: ProducerRepository
  ) {
    this.movieRepository = movieRepository;
    this.movieProducerRepository = movieProducerRepository;
    this.producerRepository = producerRepository;
  }

  listMovies(): Movie[] {
    return this.movieRepository.findAll();
  }

  listWinners(): Movie[] {
    return this.movieRepository.findWinners();
  }

  createMovie(data: CreateMovieDTO): Movie {
    const movie = this.movieRepository.create(data as Omit<CreateMovieDTO, 'producers'>);
    const producers = data.producers ? this.createManyProducers(data.producers) : [];
    this.movieProducerRepository.attachProducersToMovie(movie.id!, producers.map(p => p.id!));
    return movie;
  }

  private createManyProducers(names: string): Producer[] {
    const producers: Producer[] = [];
    const producerNames = names.split(/\s*(?:,|\band\b|&)\s*/i).filter(Boolean);
    for (const name of producerNames) {
      const producer = this.producerRepository.findOrCreate(name.trim());
      producers.push(producer);
    }
    return producers;
  }
}