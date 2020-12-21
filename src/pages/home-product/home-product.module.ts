import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeProductPage } from './home-product';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomeProductPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeProductPage),
    TranslateModule

  ],
})
export class HomeProductPageModule {}
