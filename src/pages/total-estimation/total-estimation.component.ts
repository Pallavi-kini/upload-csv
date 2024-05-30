import { Component, OnInit } from '@angular/core';
import { StoreCsvService } from 'src/store-csv.service';

@Component({
  selector: 'app-total-estimation',
  templateUrl: './total-estimation.component.html',
  styleUrls: ['./total-estimation.component.css'],
})
export class TotalEstimationComponent implements OnInit {
  validatedData: any;
  success = 0;
  error = 0;
  totalRecord = 0;

  constructor(private storeCsvService: StoreCsvService) {}

  ngOnInit() {
    this.validatedData = this.storeCsvService.getValidatedData();
    this.success = this.validatedData.success;
    this.error = this.validatedData.error;
    this.totalRecord = this.validatedData.total;
  }
}
