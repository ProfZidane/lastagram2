import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoutiqueGeneralPage } from './boutique-general';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BoutiqueGeneralPage,
  ],
  imports: [
    IonicPageModule.forChild(BoutiqueGeneralPage),
    TranslateModule
  ],
})
export class BoutiqueGeneralPageModule {}
