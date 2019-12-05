import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements OnInit {

  constructor() { }

  people = [
    { name: 'Benjamim Thiago', city: 'Teresina', state: 'Piauí', status: true },
    { name: 'Crispilino', city: 'Timon', state: 'Maranhão', status: false },
    { name: 'José Arlequin', city: null, state: '20/07/2017', status: false },
    { name: 'Amanda Nunes', city: null, state: null, status: true },
    { name: 'Sheldon Couper', city: 'Picos', state: 'Piauí', status: true },
  ];

  ngOnInit() {
  }

}
