import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchWithProductPage } from './search-with-product';

@NgModule({
  declarations: [
    SearchWithProductPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchWithProductPage),
  ],
})
export class SearchWithProductPageModule {}
