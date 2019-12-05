import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-postings',
  templateUrl: './search-postings.component.html',
  styleUrls: ['./search-postings.component.css']
})
export class SearchPostingsComponent {

  postings = [
    { type: 'DESPESA', description: 'Compra de pão', expiration_date: '30/06/2017',
      payment_date: null, value: 4.55, person: 'Padaria do José' },
    { type: 'RECEITA', description: 'Venda de software', expiration_date: '10/06/2017',
      payment_date: '09/06/2017', value: 80000, person: 'Atacado Brasil' },
    { type: 'DESPESA', description: 'Impostos', expiration_date: '20/07/2017',
      payment_date: null, value: 14312, person: 'Ministério da Fazenda' },
    { type: 'DESPESA', description: 'Mensalidade de escola', expiration_date: '05/06/2017',
      payment_date: '30/05/2017', value: 800, person: 'Escola Abelha Rainha' },
    { type: 'RECEITA', description: 'Venda de carro', expiration_date: '18/08/2017',
      payment_date: null, value: 55000, person: 'Sebastião Souza' },
    { type: 'DESPESA', description: 'Aluguel', expiration_date: '10/07/2017',
      payment_date: '09/07/2017', value: 1750, person: 'Casa Nova Imóveis' },
    { type: 'DESPESA', description: 'Mensalidade musculação', expiration_date: '13/07/2017',
      payment_date: null, value: 180, person: 'Academia Top' }
  ];

}
