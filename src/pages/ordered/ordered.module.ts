import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderedPage } from './ordered';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderedPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderedPage),
    TranslateModule
  ],
})
export class OrderedPageModule {}
