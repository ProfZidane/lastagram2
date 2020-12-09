import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyCategoryPage } from './modify-category';

@NgModule({
  declarations: [
    ModifyCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyCategoryPage),
  ],
})
export class ModifyCategoryPageModule {}
