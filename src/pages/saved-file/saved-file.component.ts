import { Component, OnInit } from '@angular/core';
import { StoreCsvService } from 'src/store-csv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-file',
  templateUrl: './saved-file.component.html',
  styleUrls: ['./saved-file.component.css'],
})
export class SavedFileComponent implements OnInit {
  csvData: any[] = [];
  parsedData: any[] = [];
  validatedData: any[] = [];
  columns: any[] = [];
  isNameString = true;

  constructor(
    private storeCsvService: StoreCsvService,
    private router: Router
  ) {}

  ngOnInit() {
    this.storeCsvService.csvData$.subscribe((data) => {
      if (data !== null) {
        this.csvData = data;
        this.parsedData = data.map((item) => {
          // Loop through each property of the item
          for (const prop in item) {
            if (Object.prototype.hasOwnProperty.call(item, prop)) {
              if (this.isNumeric(item[prop])) {
                item[prop] = parseFloat(
                  item[prop].toString().replace('\r', '')
                );
              }
            }
          }
          let cgpa = NaN;
          if (item.hasOwnProperty('CGPA') || item.hasOwnProperty('CGPA\r')) {
            const cgpaValue = item['CGPA'] || item['CGPA\r'];
            if (cgpaValue) {
              cgpa = parseFloat(cgpaValue.toString().replace('\r', ''));
            }
          }
          return {
            ...item,
            CGPA: cgpa,
          };
        });

        // Validate data
        this.validatedData = this.validateData(this.csvData);

        const validation = {
          total: this.validatedData.length,
          success: this.validatedData.filter((row) => row.isValid).length,
          error: this.validatedData.filter((row) => !row.isValid).length,
        };

        this.storeCsvService.setValidatedData(validation);
      }
    });
    this.updateColumns();
  }

  isNumeric = (value: string | number) => {
    return !isNaN(Number(value)) && value !== null && value !== '';
  };

  updateColumns() {
    if (this.validatedData.length > 0) {
      this.columns = Object.keys(this.validatedData[0])
        .filter((key) => key !== 'isValid' && key !== 'errors')
        .map((key) => ({ field: key, header: key }));
    }
  }

  validateData(data: any[]): any[] {
    return data.map((item) => {
      let isValid = true;
      const errors: { [key: string]: string } = {};

      // Validate each field
      Object.entries(item).forEach(([key, value]) => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          isValid = false;
          errors[key] = `${key} is required`;
        }
      });

      // Validate specific fields (e.g., Email, Phone, CGPA)
      if (!isValid) {
        return { ...item, isValid, errors };
      }

      // Validate Email
      if (item.Email) {
        const emailPattern =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(item.Email.trim())) {
          isValid = false;
          errors['Email'] = 'Invalid email format';
        }
      }

      // Validate Phone
      if (item.Phone) {
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(item.Phone)) {
          isValid = false;
          errors['Phone'] = 'Number should be 10 digits';
        }
      }

      // Validate CGPA
      if (
        typeof item.CGPA !== 'number' ||
        isNaN(item.CGPA) ||
        item.CGPA < 0 ||
        item.CGPA > 10
      ) {
        isValid = false;
        errors['CGPA'] = 'Invalid CGPA';
      }

      return { ...item, isValid, errors };
    });
  }

  addRow() {
    this.validatedData.push({
      Name: '',
      Email: '',
      Phone: '',
      Address: '',
      City: '',
      CGPA: '',
    });
  }
}
