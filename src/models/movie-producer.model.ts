import { Movie } from "./movie.model";
import { Producer } from "./producer.model";

export interface MovieProducer {
  movie: Movie;
  producer: Producer;
}
