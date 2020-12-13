import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProdPage } from './list-prod';

@NgModule({
  declarations: [
    ListProdPage,
  ],
  imports: [
    IonicPageModule.forChild(ListProdPage),
  ],
})
export class ListProdPageModule {}
