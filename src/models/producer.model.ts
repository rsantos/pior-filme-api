export interface Producer {
  id?: number;
  name: string;
}

export interface ProducerAwardInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface AwardsIntervalResult {
  min: ProducerAwardInterval[];
  max: ProducerAwardInterval[];
}
