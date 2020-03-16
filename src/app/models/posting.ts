import { Category } from 'src/app/models/category';
import { Person } from 'src/app/models/person';

export class Posting {
  id: number;
  description: string;
  type = 'RECEITA';
  value: number;
  expirationDate: Date;
  paymentDate: Date;
  comments: string;
  category = new Category();
  person = new Person();
  anexo: string;
  urlAnexo: string
}
