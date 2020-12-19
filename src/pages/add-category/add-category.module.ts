import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCategoryPage } from './add-category';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCategoryPage),
    TranslateModule
  ],
})
export class AddCategoryPageModule {}
