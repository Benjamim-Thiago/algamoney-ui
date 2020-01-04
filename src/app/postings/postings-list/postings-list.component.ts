import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api/public_api';

import { PostingService, PostingFilter } from '../posting.service';

@Component({
  selector: 'app-postings-list',
  templateUrl: './postings-list.component.html',
  styleUrls: ['./postings-list.component.css']
})
export class PostingsListComponent implements OnInit {
  ptbr: any;

  totalRegister = 0;
  filter = new PostingFilter();
  postings = [];

  ngOnInit() {
    this.ptbr = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
       'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],

      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
    };

    //this.list();
  }

  constructor(private postingService: PostingService) {}

  search(page = 0) {
    this.filter.page = page;
    this.postingService.search(this.filter)
    .then(result => {
      this.totalRegister = result.total;
      this.postings = result.postings;
    });
  }

  changingPage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.search(page);
  }

}
