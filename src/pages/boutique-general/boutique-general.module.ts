import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoutiqueGeneralPage } from './boutique-general';

@NgModule({
  declarations: [
    BoutiqueGeneralPage,
  ],
  imports: [
    IonicPageModule.forChild(BoutiqueGeneralPage),
  ],
})
export class BoutiqueGeneralPageModule {}
