import { Component } from '@angular/core';
import { StoreCsvService } from 'src/store-csv.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  selectedFile: File | string | null = null;
  showNextPage = false;

  constructor(private StoreCsvService: StoreCsvService) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file.name.split('.').pop().toLowerCase() !== 'csv') {
      this.selectedFile = 'Please upload a CSV file';
      this.showNextPage = false;
    } else {
      this.selectedFile = file.name;
      this.showNextPage = true;
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
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
  }
}
