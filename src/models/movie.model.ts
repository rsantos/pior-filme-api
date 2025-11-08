import { Producer } from "./producer.model";

export interface Movie {
  id?: number;
  year: number;
  title: string;
  studios: string;
  producers?: Producer[];
  winner: boolean;
}
