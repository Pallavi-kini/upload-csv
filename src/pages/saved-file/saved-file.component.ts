import { Component, OnInit } from '@angular/core';
import { StoreCsvService } from 'src/store-csv.service';

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

  constructor(private storeCsvService: StoreCsvService) {}

  ngOnInit() {
    this.storeCsvService.csvData$.subscribe((data) => {
      if (data !== null) {
        // Parse and trim CGPA, then validate data
        this.csvData = data;
        this.parsedData = data.map((item) => {
          // Loop through each property of the item
          for (const prop in item) {
            if (Object.prototype.hasOwnProperty.call(item, prop)) {
              if (this.isNumeric(item[prop])) {
                item[prop] = parseFloat(
                  item[prop].toString().replace('\r', '')
                );
              } else {
                item[prop] = item[prop];
              }
            }
          }
          const cgpa = item['CGPA\r']
            ? parseFloat(item['CGPA\r'].toString().replace('\r', ''))
            : NaN;
          return {
            ...item,
            CGPA: cgpa,
          };
        });

        // Validate data
        this.validatedData = this.validateData(this.parsedData);
        console.log(this.validatedData);
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
      if (typeof item.Name !== 'string' || item.Name.trim() === '') {
        isValid = false;
        errors['Name'] = 'Invalid string';
      }

      // Validate Email
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(item.Email)) {
        isValid = false;
        errors['Email'] = 'Invalid email';
      }

      // Validate Phone
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(item.Phone)) {
        isValid = false;
        errors['Phone'] = 'Invalid phone number';
      }

      // Validate City
      if (typeof item.City !== 'string' || item.City.trim() === '') {
        isValid = false;
        errors['City'] = 'Invalid string';
      }

      // Validate Address
      if (typeof item.Addresss !== 'string' || item.Addresss.trim() === '') {
        isValid = false;
        errors['Address'] = 'Invalid string';
      }

      // Validate CGPA
      if (typeof item.CGPA !== 'number' || item.CGPA < 0 || item.CGPA > 10) {
        isValid = false;
        errors['CGPA'] = 'Invalid CGPA';
      }

      return { ...item, isValid, errors };
    });
  }
}
