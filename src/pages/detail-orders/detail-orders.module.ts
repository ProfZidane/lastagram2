import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailOrdersPage } from './detail-orders';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailOrdersPage),
    TranslateModule
  ],
})
export class DetailOrdersPageModule {}
