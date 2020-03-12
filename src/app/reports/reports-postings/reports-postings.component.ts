import { Component, OnInit } from '@angular/core';

import { ReportService } from '../report.service';

@Component({
  selector: 'app-reports-postings',
  templateUrl: './reports-postings.component.html',
  styleUrls: ['./reports-postings.component.css']
})
export class ReportsPostingsComponent implements OnInit {
  firstDate: Date;
  lastDate: Date;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
  }

  make() {
    this.reportService.reportPostingPerPerson(this.firstDate, this.lastDate)
    .then(report => {
      const url = window.URL.createObjectURL(report);

      window.open(url);
    });
  }

}
