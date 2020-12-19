import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyShopPage } from './my-shop';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyShopPage,
  ],
  imports: [
    IonicPageModule.forChild(MyShopPage),
    TranslateModule
  ],
})
export class MyShopPageModule {}
