import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faDongSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
})
export class RecommendComponent implements OnInit {
  budgetForm: FormGroup;
  budget: number = 0;
  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe) {
    this.budgetForm = this.fb.group({
      budget: [0],
    });
  }
  ngOnInit(): void {
    this.budgetForm.get('budget')?.valueChanges.subscribe((value) => {
      this.budgetForm
        .get('budget')
        ?.setValue(this.formatCurrency(value), { emitEvent: false });
    });
  }
  faDongSign = faDongSign as IconProp;
  toppings = new FormControl('');
  minDate!: Date;
  selectedDate!: Date;
  selectedHobby: string = '';
  priceRange: number[] = [0, 100000000];
  hobbies: string[] = [
    'Du lịch nghỉ dưỡng',
    'Du lịch khám phá văn hóa và lịch sử',
    'Du lịch phiêu lưu và khám phá thiên nhiên',
    'Du lịch ẩm thực',
    'Du lịch mua sắm',
    'Du lịch gia đình',
    'Du lịch theo nhóm bạn bè hoặc theo team-building',
    'Du lịch kết hợp công việc (bleisure)',
    'Du lịch y tế và chăm sóc sức khỏe',
  ];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'VND', 'symbol', '1.0-0') || '';
  }
  searchButtonClicked() {}
}
