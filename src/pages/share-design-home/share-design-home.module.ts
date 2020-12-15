import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareDesignHomePage } from './share-design-home';

@NgModule({
  declarations: [
    ShareDesignHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ShareDesignHomePage),
  ],
})
export class ShareDesignHomePageModule {}
