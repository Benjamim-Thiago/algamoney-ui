import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-posting',
  templateUrl: './register-posting.component.html',
  styleUrls: ['./register-posting.component.css']
})
export class RegisterPostingComponent implements OnInit {
  ptbr: any;
  types = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];
  constructor() { }

  ngOnInit() {
    this.ptbr = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],
      monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
      monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
  };
  }

}
