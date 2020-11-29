import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchByMarketPage } from './search-by-market';

@NgModule({
  declarations: [
    SearchByMarketPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchByMarketPage),
  ],
})
export class SearchByMarketPageModule {}
