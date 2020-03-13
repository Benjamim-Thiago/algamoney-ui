
import { Address } from 'src/app/models/address';
import { Contact } from './contact';

export class Person {
  id: number;
  name: string;
  address = new Address();
  status = true;
  contacts = new Array<Contact>();
}
