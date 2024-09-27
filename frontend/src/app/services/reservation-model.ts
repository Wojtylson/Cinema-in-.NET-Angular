import { User } from './user-model';
import { Reservation_Details } from './reservation_details-model';
export class Reservation {
  id: number = 0;
  user?: User;
  reservationDetails?: Reservation_Details;
}
