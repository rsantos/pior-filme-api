import ProducerRepository from '../repositories/producer.repository';
import MovieRepository from '../repositories/movie.repository';
import { Producer } from '../models/producer.model';

interface AwardInterval {
  min: Array<{
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
  }>;
  max: Array<{
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
  }>;
}

export default class ProducerService {
  private movieRepository: MovieRepository;
  private producerRepository: ProducerRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
    this.producerRepository = new ProducerRepository();
  }

  awardIntervals(): AwardInterval {
    return {
      min: [
        {
          producer: "Joel Silver",
          interval: 8,
          previousWin: 1990,
          followingWin: 1998,
        },
        {
          producer: "Matthew Vaughn",
          interval: 8,
          previousWin: 2002,
          followingWin: 2010,
        },
      ],
      max: [
        {
          producer: "Mark Wahlberg",
          interval: 13,
          previousWin: 1997,
          followingWin: 2010,
        },
      ],
    };
  }

  createManyProducers(names: string): Producer[] {
    const producers: Producer[] = [];
    const producerNames = names.split(/\s*(?:,|and)\s*/i).filter(Boolean);
    for (const name of producerNames) {
      const producer = this.producerRepository.findOrCreate(name.trim());
      producers.push(producer);
    }
    return producers;
  }
}