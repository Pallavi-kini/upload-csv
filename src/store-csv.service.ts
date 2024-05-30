import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreCsvService {
  private csvDataSubject = new BehaviorSubject<any[] | null>(null);
  csvData$ = this.csvDataSubject.asObservable();

  setCsvData(data: any[]): void {
    this.csvDataSubject.next(data);
  }

  getCsvData(): any[] | null {
    return this.csvDataSubject.getValue();
  }
}
