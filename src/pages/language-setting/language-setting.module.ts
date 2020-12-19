import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanguageSettingPage } from './language-setting';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LanguageSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(LanguageSettingPage),
    TranslateModule
  ],
})
export class LanguageSettingPageModule {}
