import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyProdSpecialPage } from './modify-prod-special';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModifyProdSpecialPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyProdSpecialPage),
    TranslateModule
  ],
})
export class ModifyProdSpecialPageModule {}
