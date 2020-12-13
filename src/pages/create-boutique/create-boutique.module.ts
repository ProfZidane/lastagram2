import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateBoutiquePage } from './create-boutique';

@NgModule({
  declarations: [
    CreateBoutiquePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateBoutiquePage),
  ],
})
export class CreateBoutiquePageModule {}
