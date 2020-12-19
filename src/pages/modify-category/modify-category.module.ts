import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyCategoryPage } from './modify-category';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModifyCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyCategoryPage),
    TranslateModule
  ],
})
export class ModifyCategoryPageModule {}
