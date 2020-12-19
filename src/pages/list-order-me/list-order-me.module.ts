import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOrderMePage } from './list-order-me';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListOrderMePage,
  ],
  imports: [
    IonicPageModule.forChild(ListOrderMePage),
    TranslateModule
  ],
})
export class ListOrderMePageModule {}
