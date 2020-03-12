import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pieChartData: any;
  lineChartData: any ;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const value = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(value, '1.2-2');
        }
      }
    }
  };


  constructor(private  dashboardService: DashboardService, private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.configurateChartPizza();
    this.configurateChartLine();
  }

  configurateChartPizza() {
    this.dashboardService.postingsPerCategory()
      .then(datas => {
        this.pieChartData = {
          labels: datas.map(data => data.category.name),
          datasets: [
            {
              data: datas.map(data => data.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                                  '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      });
  }

  configurateChartLine() {
    this.dashboardService.postingsPerDay()
      .then(datas => {
        const daysOfMonth = this.configurateDaysMonth();
        const totalsReceitas = this.totalsPerDayMonth(
          datas.filter(data => data.type === 'RECEITA'), daysOfMonth);
        const totalsDespesas = this.totalsPerDayMonth(
          datas.filter(data => data.type === 'DESPESA'), daysOfMonth);

        this.lineChartData = {
          labels: daysOfMonth,
          datasets: [
            {
              label: 'Receitas',
              data: totalsReceitas,
              borderColor: '#3366CC'
            },
            {
              label: 'Despesas',
              data: totalsDespesas,
              borderColor: '#D62B00'
            }
          ]
        }
      });
  }


  private totalsPerDayMonth(datas, daysOfMonth) {
    const totals: number[] = [];
    for (const day of daysOfMonth) {
      let total = 0;

      for (const data of datas) {

        if ((new Date(data.day).getDate() + 1) === day) {
          total = data.total;

          break;
        }
      }

      totals.push(total);
    }

    return totals;
  }

  private configurateDaysMonth() {
    const referenceMonth = new Date();
    referenceMonth.setMonth(referenceMonth.getMonth() + 1);
    referenceMonth.setDate(0);

    const amountDays = referenceMonth.getDate();

    const days: number[] = [];

    for (let i = 1; i <= amountDays; i++) {
      days.push(i);
    }

    return days;
  }
}
