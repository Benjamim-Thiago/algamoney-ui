import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-postings',
  templateUrl: './list-postings.component.html',
  styleUrls: ['./list-postings.component.css']
})
export class ListPostingsComponent {

  postings = [
    { type: 'DESPESA', description: 'Compra de pão', expiration_date: new Date(2017, 6, 30),
      payment_date: null, value: 4.55, person: 'Padaria do José' },
    { type: 'RECEITA', description: 'Venda de software', expiration_date: new Date(2017, 6, 10),
      payment_date: new Date(2017, 6, 9), value: 80000, person: 'Atacado Brasil' },
    { type: 'DESPESA', description: 'Impostos', expiration_date: new Date(2017, 7, 20),
      payment_date: null, value: 14312, person: 'Ministério da Fazenda' },
    { type: 'DESPESA', description: 'Mensalidade de escola', expiration_date: new Date(2017, 6, 5),
      payment_date: new Date(2017, 5, 30), value: 800, person: 'Escola Abelha Rainha' },
    { type: 'RECEITA', description: 'Venda de carro', expiration_date: new Date(2017, 8, 18),
      payment_date: null, value: 55000, person: 'Sebastião Souza' },
    { type: 'DESPESA', description: 'Aluguel', expiration_date: new Date(2017, 7, 10),
      payment_date: new Date(2017, 7, 9), value: 1750, person: 'Casa Nova Imóveis' },
    { type: 'DESPESA', description: 'Mensalidade musculação', expiration_date: new Date(2017, 7, 13),
      payment_date: null, value: 180, person: 'Academia Top' }
  ];

}
