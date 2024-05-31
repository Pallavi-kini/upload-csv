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
            cgpa = parseFloat(cgpaValue.toString().replace('\r', ''));
          }
          return {
            ...item,
            CGPA: cgpa,
          };
        });

        // Validate data
        this.validatedData = this.validateData(this.parsedData);

        const validation = {
          total: this.validatedData.length,
          success: this.validatedData.filter((row) => row.isValid).length,
          error: this.validatedData.filter((row) => !row.isValid).length,
        };

        this.storeCsvService.setValidatedData(validation);
      }
    });
  }

  isNumeric = (value: string | number) => {
    return !isNaN(Number(value)) && value !== null && value !== '';
  };

  validateData(data: any[]): any[] {
    return data.map((item) => {
      let isValid = true;
      const errors: { [key: string]: string } = {};

      // Validate Name
      if (item.Name === '') {
        errors['Name'] = 'Name is required';
      } else {
        if (typeof item.Name !== 'string') {
          isValid = false;
          errors['Name'] = 'Invalid string';
        }
      }

      // Validate Email
      if (!item.Email || typeof item.Email !== 'string' || !item.Email.trim()) {
        isValid = false;
        errors['Email'] = 'Email is required';
      } else {
        const emailPattern =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(item.Email.trim())) {
          isValid = false;
          errors['Email'] = 'Invalid email format';
        }
      }

      // Validate Phone
      if (item.Phone === '') {
        errors['Phone'] = 'Number is required';
      } else {
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(item.Phone)) {
          isValid = false;
          errors['Phone'] = 'Number should be 10 digits';
        }
      }

      // Validate City
      if (item.City === '') {
        errors['City'] = 'City is required';
      } else {
        if (typeof item.City !== 'string') {
          isValid = false;
          errors['City'] = 'Invalid string';
        }
      }

      // Validate Address
      if (item.Addresss === '') {
        // Corrected the typo here
        errors['Address'] = 'Address is required';
      } else {
        if (typeof item.Addresss !== 'string') {
          // Corrected the typo here
          isValid = false;
          errors['Address'] = 'Invalid string';
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

  handleCheckForString(data: any) {
    console.log(data);
  }
}
