import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchWithShopPage } from './search-with-shop';

@NgModule({
  declarations: [
    SearchWithShopPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchWithShopPage),
  ],
})
export class SearchWithShopPageModule {}
