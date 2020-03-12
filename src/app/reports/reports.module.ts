import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReportsPostingsComponent } from './reports-postings/reports-postings.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [ReportsPostingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,

    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
