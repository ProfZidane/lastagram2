import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuMarketPage } from './menu-market';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MenuMarketPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuMarketPage),
    TranslateModule
  ],
})
export class MenuMarketPageModule {}
