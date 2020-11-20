import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
/**
 * Generated class for the ShareComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'share',
  templateUrl: 'share.html'
})
export class ShareComponent {
  rootPage:any = TabsPage;

  text: string;

  constructor() {
    console.log('Hello ShareComponent Component');
    this.text = 'Hello World';
  }

}
