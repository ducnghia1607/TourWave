import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  @Output() confirm = new EventEmitter<string>();
  consentClick() {
    this.confirm.emit('1');
  }
  declineClick() {
    this.confirm.emit('2');
  }
}
