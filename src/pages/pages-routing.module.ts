import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedFileComponent } from './saved-file/saved-file.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { TotalEstimationComponent } from './total-estimation/total-estimation.component';

const routes: Routes = [
  { path: '', component: UploadFileComponent },
  { path: 'saved', component: SavedFileComponent },
  { path: 'estimated', component: TotalEstimationComponent },
  { path: 'saved/estimated', redirectTo: 'estimated', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
