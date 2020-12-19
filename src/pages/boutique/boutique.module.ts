import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoutiquePage } from './boutique';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BoutiquePage,
  ],
  imports: [
    IonicPageModule.forChild(BoutiquePage),
    TranslateModule
  ],
})
export class BoutiquePageModule {}
