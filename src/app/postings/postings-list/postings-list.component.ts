import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent} from 'primeng/api/public_api';
import {ConfirmationService} from 'primeng/api';

import { PostingService, PostingFilter } from '../posting.service';
import { Table } from 'primeng/table/table';
import { ToastyService } from 'ng2-toasty';
import { CalendarTranslateService } from 'src/app/calendar-translate.service';

@Component({
  selector: 'app-postings-list',
  templateUrl: './postings-list.component.html',
  styleUrls: ['./postings-list.component.css']
})
export class PostingsListComponent implements OnInit {
  private calendarTranslate = new CalendarTranslateService();
  ptbr: any;

  @ViewChild('table', {static: true}) grid: Table;

  totalRegister = 0;
  filter = new PostingFilter();
  postings = [];

  ngOnInit() {
    this.ptbr = this.calendarTranslate.translate();
  }

  constructor(
    private postingService: PostingService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService) {}

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

  confirmRemove(posting: any) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja
        excluir o lancamento <strong>${posting.description}</strong>?`,
      accept: () => {
        this.remove(posting);
      }
    });
  }

  remove(posting: any) {
    this.postingService.remove(posting.id)
      .then(() => {
        this.grid.reset();
        this.toastyService.success('Lançamento excluído com sucesso!');
      });
  }

}
