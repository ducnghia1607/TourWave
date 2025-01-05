import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/notification/notification.component';
import { ConsultingResponse } from 'src/app/shared/models/ConsultingResponse';

@Component({
  selector: 'app-consulting-dialog-view',
  templateUrl: './consulting-dialog-view.component.html',
  styleUrls: ['./consulting-dialog-view.component.css'],
})
export class ConsultingDialogViewComponent {
  consulting!: ConsultingResponse;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.consulting = data['consulting'];
  }
}
