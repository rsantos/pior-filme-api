import { Request, Response } from "express";
import ProducerService from '../services/producer.service';

export default class ProducerController {
  private producerService: ProducerService;

  constructor() {
    this.producerService = new ProducerService();
  }

  awardIntervals = (_: Request, res: Response): void => {
    const intervals = this.producerService.awardIntervals();
    res.status(200).json(intervals);
  }
}