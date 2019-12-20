import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-people-grid',
  templateUrl: './people-grid.component.html',
  styleUrls: ['./people-grid.component.css']
})
export class PeopleGridComponent implements OnInit {

  @Input() people = [];
  constructor() { }

  ngOnInit() {
  }

}
