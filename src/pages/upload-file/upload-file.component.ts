import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsText(this.selectedFile);
      reader.onload = () => {
        const csvContent = reader.result as string;
        console.log(csvContent); // This will log the content of the CSV file
        this.processCSV(csvContent);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
  }

  // Method to process CSV content
  processCSV(csvContent: string): void {
    // Implement your CSV parsing logic here
    console.log('Processing CSV content:', csvContent);
    // For example, you can use a CSV parsing library like PapaParse to convert the content to a usable format
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
