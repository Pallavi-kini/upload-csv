import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SavedFileComponent } from './saved-file/saved-file.component';
import { TotalEstimationComponent } from './total-estimation/total-estimation.component';
import { FormsModule } from '@angular/forms';

@NgModule({ declarations: [
        UploadFileComponent,
        SavedFileComponent,
        TotalEstimationComponent,
    ],
    exports: [UploadFileComponent], imports: [CommonModule, PagesRoutingModule, FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class PagesModule {}
