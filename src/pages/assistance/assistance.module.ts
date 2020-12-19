import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssistancePage } from './assistance';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AssistancePage,
  ],
  imports: [
    IonicPageModule.forChild(AssistancePage),
    TranslateModule
  ],
})
export class AssistancePageModule {}
