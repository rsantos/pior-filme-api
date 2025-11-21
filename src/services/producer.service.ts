import ProducerRepository from '../repositories/producer.repository';
import { AwardsIntervalResult } from '../models/producer.model';


export default class ProducerService {
  private producerRepository: ProducerRepository;

  constructor(producerRepository: ProducerRepository) {
    this.producerRepository = producerRepository;
  }

  awardIntervals(): AwardsIntervalResult {
    const minIntervals = this.producerRepository.calculateAwardIntervals('min');
    const maxIntervals = this.producerRepository.calculateAwardIntervals('max');
    return {
      min: minIntervals,
      max: maxIntervals,
    };
  }
}