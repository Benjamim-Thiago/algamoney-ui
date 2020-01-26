import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container">
      <h1 class="text-center">Pagina não encontrada</h1>
      <a routerLink="/postings">Voltar para lançamentos</a>
    </div>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
