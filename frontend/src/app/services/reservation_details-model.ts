import { Movie } from './movie-model';

export class Reservation_Details {
  id: number = 0;
  movie: Movie = null;
  hour: string = null;
  day: string = null;
  seats: number[] = [];
}
