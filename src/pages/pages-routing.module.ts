import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedFileComponent } from './saved-file/saved-file.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
  { path: '', component: UploadFileComponent },
  { path: 'saved', component: SavedFileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
