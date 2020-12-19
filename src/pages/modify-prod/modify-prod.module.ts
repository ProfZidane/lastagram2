import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyProdPage } from './modify-prod';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModifyProdPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyProdPage),
    TranslateModule
  ],
})
export class ModifyProdPageModule {}
