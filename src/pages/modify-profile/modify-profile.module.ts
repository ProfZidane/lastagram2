import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyProfilePage } from './modify-profile';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModifyProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyProfilePage),
    TranslateModule
  ],
})
export class ModifyProfilePageModule {}
