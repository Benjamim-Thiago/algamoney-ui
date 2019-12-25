import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <div *ngIf="haveError()"
    class="ui-messages ui-messages-error">
    {{ text }}
  </div>
  `,
  styles: [`
      .ui-messages-error {
        margin-top: 4px;
      }
  `]
})
export class MessageComponent implements OnInit {
  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  haveError(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

  constructor() { }

  ngOnInit() {
  }

}
