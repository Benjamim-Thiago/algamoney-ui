import { City } from './city';

export class Address {
  place: string;
  number: number;
  complement: string;
  neighborhood: string;
  zipcode: string;
  city = new City();
}
