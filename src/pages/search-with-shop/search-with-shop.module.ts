import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchWithShopPage } from './search-with-shop';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SearchWithShopPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchWithShopPage),
    TranslateModule
  ],
})
export class SearchWithShopPageModule {}
