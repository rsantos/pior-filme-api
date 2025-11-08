import MovieRepository from '../repositories/movie.repository';

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

  constructor() {
    this.movieRepository = new MovieRepository();
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
}