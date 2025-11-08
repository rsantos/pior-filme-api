import ProducerRepository from '../repositories/producer.repository';
import { AwardsIntervalResult, Producer } from '../models/producer.model';


export default class ProducerService {
  private producerRepository: ProducerRepository;

  constructor() {
    this.producerRepository = new ProducerRepository();
  }

  awardIntervals(): AwardsIntervalResult {
    const minIntervals = this.producerRepository.calculateAwardIntervals('min');
    const maxIntervals = this.producerRepository.calculateAwardIntervals('max');
    return {
      min: minIntervals,
      max: maxIntervals,
    };
  }

  createManyProducers(names: string): Producer[] {
    const producers: Producer[] = [];
    const producerNames = names.split(/\s*(?:,|\band\b|&)\s*/i).filter(Boolean);
    for (const name of producerNames) {
      const producer = this.producerRepository.findOrCreate(name.trim());
      producers.push(producer);
    }
    return producers;
  }
}