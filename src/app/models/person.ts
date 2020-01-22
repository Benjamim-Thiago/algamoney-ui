
import { Address } from 'src/app/models/address';

export class Person {
  id: number;
  name: string;
  address = new Address();
  status = true;
}
