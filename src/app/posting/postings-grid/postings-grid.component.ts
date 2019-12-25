import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-postings-grid',
  templateUrl: './postings-grid.component.html',
  styleUrls: ['./postings-grid.component.css']
})
export class PostingsGridComponent implements OnInit {

  @Input() postings = [];

  constructor() { }

  ngOnInit() {
  }

}
