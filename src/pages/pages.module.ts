import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { HttpClientModule } from '@angular/common/http';
import { SavedFileComponent } from './saved-file/saved-file.component';

@NgModule({
  declarations: [UploadFileComponent, SavedFileComponent],
  imports: [CommonModule, PagesRoutingModule, HttpClientModule],
  exports: [UploadFileComponent],
})
export class PagesModule {}
