import { Component, OnInit } from '@angular/core';
import { CalendarTranslateService } from 'src/app/calendar-translate.service';

@Component({
  selector: 'app-posting-register',
  templateUrl: './posting-register.component.html',
  styleUrls: ['./posting-register.component.css']
})
export class PostingRegisterComponent implements OnInit {
  private calendarTranslate = new CalendarTranslateService();
  ptbr: any;

  types = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categories = [
    {label: 'Alimentação', value: '1'},
    {label: 'Transporte', value: '2'}
  ];

  people = [
    {label: 'Benjamim Thiago', value: '1'},
    {label: 'Raquel', value: '2'},
    {label: 'Francisca', value: '3'},
    {label: 'José Arlindo', value: '4'},
    {label: 'Jacentes Tevez', value: '5'},
    {label: 'Mario kilan', value: '6'},
    {label: 'Amanda Nunes', value: '7'},
    {label: 'Jon Jones', value: '8'},
    {label: 'Lyoto Machida', value: '9'},
    {label: 'Marcus', value: '10'},
    {label: 'Maire', value: '11'},
    {label: 'Mariano', value: '12'}
  ];

  constructor() { }

  ngOnInit() {
    this.ptbr = this.calendarTranslate.translate();
  }

}
