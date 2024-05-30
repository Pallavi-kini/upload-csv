import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StoreCsvService } from 'src/store-csv.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private StoreCsvService: StoreCsvService
  ) {}

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsText(this.selectedFile);
      reader.onload = () => {
        const csvContent = reader.result as string; // Get the CSV content from reader.result
        const parsedData = this.parseCsv(csvContent); // Parse the CSV content
        this.StoreCsvService.setCsvData(parsedData); // Store the parsed data
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
  }

  // Method to process CSV content
  private parseCsv(csvContent: string): any[] {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    const data = lines.slice(1).map((line) => {
      const values = line.split(',');
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index]?.trim();
      });
      return obj;
    });
    return data;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
    console.log(fileInput);
  }

  // uploadFile() {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('file', this.selectedFile, this.selectedFile.name);

  //     this.http.post('/api/upload', formData).subscribe(
  //       (response) => {
  //         console.log('File uploaded successfully', response);
  //       },
  //       (error) => {
  //         console.error('File upload failed', error);
  //       }
  //     );
  //   } else {
  //     alert('Please select a file first');
  //   }
  // }
}
