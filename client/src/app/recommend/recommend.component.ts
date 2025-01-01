import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faDongSign } from '@fortawesome/free-solid-svg-icons';
import { TourTypeHobby } from '../shared/models/TourTypeHobby';
import { RecommendService } from './recommend.service';
import { TourToRecommend } from '../shared/models/TourToRecommend';
import { TourWithType } from '../shared/models/TourWithType';
import { Schedule } from '../shared/models/Schedule';
import { Pagination } from '../shared/models/Pagination';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
})
export class RecommendComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private recommendService: RecommendService,
    private datePipe: DatePipe
  ) {
    this.getAllTourTypeHobby();
    // this.getAllTourToRecommend();
  }
  ngOnInit(): void {
    // this.budgetForm.get('budget')?.valueChanges.subscribe((value) => {
    //   this.budgetForm
    //     .get('budget')
    //     ?.setValue(this.formatCurrency(value), { emitEvent: false });
    // });
  }
  faDongSign = faDongSign as IconProp;
  toppings = new FormControl('');
  minDate!: Date;
  selectedDate!: Date;
  selectedHobby: string = '';
  priceRange: number[] = [0, 100000000];
  tourTypeHobby: TourTypeHobby[] = [];
  tourToRecommend!: TourToRecommend[];
  tourRePagination!: Pagination<TourToRecommend[]>;
  hobbies = [
    {
      name: 'Du lịch nghỉ dưỡng',
      id: '1',
    },
    {
      name: 'Du lịch khám phá văn hóa và lịch sử',
      id: '2',
    },
    {
      name: 'Du lịch phiêu lưu và khám phá thiên nhiên',
      id: '3',
    },
    {
      name: 'Du lịch ẩm thực',
      id: '4',
    },
    {
      name: 'Du lịch mua sắm',
      id: '5',
    },
    {
      name: 'Du lịch gia đình',
      id: '6',
    },
    {
      name: 'Du lịch theo nhóm bạn bè hoặc theo team-building',
      id: '7',
    },
    {
      name: 'Du lịch kết hợp công việc (bleisure)',
      id: '8',
    },
    {
      name: 'Du lịch y tế và chăm sóc sức khỏe',
      id: '9',
    },
    {
      name: 'Du lịch nghỉ dưỡng',
      id: '10',
    },
  ];

  getAllTourTypeHobby() {
    return this.recommendService.getAllTourTypeHobby().subscribe({
      next: (res) => {
        console.log(res);
        if (res) this.tourTypeHobby.push(res);
      },
      error: (err) => console.log(err),
    });
  }

  getAllTourToRecommend() {
    return this.recommendService.getAllTourToRecommend().subscribe({
      next: (res) => {
        // console.log(res);
        this.tourRePagination = res;
        this.tourToRecommend = res.data;
        // if (res && Array.isArray(res)) {
        // }
        var recommendFormValue = this.recommendForm.value;

        this.tourToRecommend.forEach((element) => {
          if (recommendFormValue.budget)
            element.priceSuitability =
              RecommendComponent.calculatePriceSuitability(
                element.priceAdult,
                recommendFormValue.budget
              );

          if (recommendFormValue.start && recommendFormValue.end) {
            var maxDateSuit = 0;
            element.schedules.forEach((x: Schedule) => {
              if (x.departureDate != null && x.returnDate != null) {
                var dt = this.datePipe.transform(x.departureDate, 'yyyy-MM-dd');
                var rd = this.datePipe.transform(x.returnDate, 'yyyy-MM-dd');
                if (recommendFormValue.start && recommendFormValue.end) {
                  if (dt != null && rd != null) {
                    var temp = 0;
                    temp = RecommendComponent.calculateDateSuitability(
                      dt,
                      rd,
                      recommendFormValue.start,
                      recommendFormValue.end
                    );
                    if (temp && temp > maxDateSuit) maxDateSuit = temp;
                  }
                }
              }
            });
            element.dateSuitability = maxDateSuit;
            if (recommendFormValue.hobby)
              element.hobbySuitability =
                RecommendComponent.calculateHobbySuitability(
                  recommendFormValue.hobby,
                  element.tourWithType,
                  this.tourTypeHobby
                );
            element.totalSuitability = this.calculateTotalSuitability(
              element.hobbySuitability,
              element.priceSuitability,
              element.dateSuitability
            );

            console.log(this.tourToRecommend);
          }
        });

        // this.tourToRecommend.push(res);
        console.log(this.tourToRecommend);
        this.tourToRecommend = this.tourToRecommend.sort((a, b) => {
          return b.totalSuitability - a.totalSuitability; // Sắp xếp giảm dần theo totalSuitability
        });
        this.tourRePagination.data = this.tourToRecommend;
        console.log(this.tourToRecommend);
      },
      error: (err) => console.log(err),
    });
  }
  recommendForm = new FormGroup({
    start: new FormControl<string | null>(null),
    end: new FormControl<string | null>(null),
    budget: new FormControl<number | null>(null),
    hobby: new FormControl<string | null>(null),
  });

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'VND', 'symbol', '1.0-0') || '';
  }
  searchButtonClicked() {
    this.getAllTourToRecommend();
  }

  static calculatePriceSuitability(
    priceAdult: number,
    priceRecommend: number
  ): number {
    if (priceAdult > priceRecommend) {
      return 0;
    } else if (priceAdult === priceRecommend) {
      return 1;
    } else {
      return (priceRecommend - priceAdult) / priceRecommend;
    }
  }

  static calculateDateSuitability(
    departureDate: string,
    returnDate: string,
    departureDateRecommend: string,
    returnDateRecommend: string
  ): number {
    var dDate = new Date(departureDate);
    var rDate = new Date(returnDate);
    const do1 = new Date(departureDateRecommend);
    const do2 = new Date(returnDateRecommend);
    if (dDate <= do1 && rDate >= do2) return 1;
    if (rDate < do1 || do2 < dDate) return 0;
    else {
      const span = dDate.getDate() - rDate.getDate();
      const t1 = Math.min(do2.getDate(), rDate.getDate());
      const t2 = Math.max(do1.getDate(), dDate.getDate());
      return Math.max(0, (t1 - t2) / span);
    }
  }

  static calculateHobbySuitability(
    hobbyId: string,
    tourWithType: TourWithType[],
    tourTypeHobby: TourTypeHobby[]
  ) {
    var ttb = tourTypeHobby.at(0);
    var sum = Array.of(ttb).reduce((acc, current) => {
      if (current == null) return acc;
      var it = tourTypeHobby.find(
        (x) => current.tourTypeId == x.tourTypeId && x.tourHobbyId == hobbyId
      );
      if (it) {
        return acc + it.appropriate;
      } else {
        return acc;
      }
    }, 0);
    var count = tourWithType.length;
    return sum / count;
  }

  calculateTotalSuitability(hobbyS: number, priceS: number, dateS: number) {
    return hobbyS * 0.2 + priceS * 0.4 + dateS * 0.6; // date:0.2
  }
}
