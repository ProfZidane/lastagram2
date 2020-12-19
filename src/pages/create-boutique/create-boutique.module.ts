import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateBoutiquePage } from './create-boutique';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateBoutiquePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateBoutiquePage),
    TranslateModule
  ],
})
export class CreateBoutiquePageModule {}
