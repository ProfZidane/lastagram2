import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchWithProductPage } from './search-with-product';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SearchWithProductPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchWithProductPage),
    TranslateModule
  ],
})
export class SearchWithProductPageModule {}
