import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageVieweerPage } from './image-vieweer';

@NgModule({
  declarations: [
    ImageVieweerPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageVieweerPage),
  ],
})
export class ImageVieweerPageModule {}
