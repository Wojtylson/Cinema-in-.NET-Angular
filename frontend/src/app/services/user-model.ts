import { Reservation } from './reservation-model';

export class User {
  id: number = 0;
  email: string = '';
  active: boolean;
  isAdmin: boolean;
  password: string = '';
  //passwordrepeat: string = '';
  reservations: Reservation[] = [];
}
