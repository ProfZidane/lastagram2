import { SearchWithShopPageModule } from './../pages/search-with-shop/search-with-shop.module';
import { SharePageModule } from './../pages/share/share.module';
import { MyShopPageModule } from './../pages/my-shop/my-shop.module';
import { PasswordModifyPageModule } from './../pages/password-modify/password-modify.module';
import { RegisterPageModule } from './../pages/register/register.module';
import { PasswordForgetPageModule } from './../pages/password-forget/password-forget.module';
import { PasswordValidationPageModule } from './../pages/password-validation/password-validation.module';
import { LoginPageModule } from './../pages/login/login.module';
import { ProfilePageModule } from './../pages/profile/profile.module';
import { CreateBoutiquePageModule } from './../pages/create-boutique/create-boutique.module';
import { BoutiquePageModule } from './../pages/boutique/boutique.module';
import { BoutiqueCreatedPageModule } from './../pages/boutique-created/boutique-created.module';
import { AddCategoryPageModule } from './../pages/add-category/add-category.module';
import { AddProductPageModule } from './../pages/add-product/add-product.module';
import { ProductAddedPageModule } from './../pages/product-added/product-added.module';
import { ProductToSharePageModule } from './../pages/product-to-share/product-to-share.module';
import { ProductSharedPageModule } from './../pages/product-shared/product-shared.module';
import { WelcomePageModule } from './../pages/welcome/welcome.module';
import { ModifyProfilePageModule } from './../pages/modify-profile/modify-profile.module';
import { MessageMenuPageModule } from './../pages/message-menu/message-menu.module';
import { MessageContentPageModule } from './../pages/message-content/message-content.module';
import { SearchPageModule } from './../pages/search/search.module';
import { SearchWithProductPageModule } from './../pages/search-with-product/search-with-product.module';
import { DetailProductPageModule } from './../pages/detail-product/detail-product.module';
import { ListProdPageModule } from './../pages/list-prod/list-prod.module';
import { ModifyProdPageModule } from './../pages/modify-prod/modify-prod.module';
import { ModifyCouverturePageModule } from './../pages/modify-couverture/modify-couverture.module';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SocketProvider } from './../providers/socket/socket';
import { ShopToSharePageModule } from './../pages/shop-to-share/shop-to-share.module';
import { DetailNotifPageModule } from './../pages/detail-notif/detail-notif.module';
import { MyNotifPageModule } from './../pages/my-notif/my-notif.module';
import { DetailOrdersPageModule } from './../pages/detail-orders/detail-orders.module';
import { MyOrdersPageModule } from './../pages/my-orders/my-orders.module';
import { OrderedPageModule } from './../pages/ordered/ordered.module';
import { ProductOfCategoryPageModule } from './../pages/product-of-category/product-of-category.module';
import { BoutiqueGeneralPageModule } from './../pages/boutique-general/boutique-general.module';
import { ModifyProdSpecialPageModule } from './../pages/modify-prod-special/modify-prod-special.module';


import { CartPageModule } from './../pages/cart/cart.module';
import { CheckoutPageModule } from './../pages/checkout/checkout.module';
import { AddProductSpecialPageModule } from './../pages/add-product-special/add-product-special.module';
import { StoreProvider } from './../providers/store/store';















import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';




import { Deeplinks } from '@ionic-native/deeplinks';



import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';




import { FormsModule } from '@angular/forms';
import { UserProvider } from '../providers/user/user';
import { Camera } from '@ionic-native/camera';
import { OrderProvider } from '../providers/order/order';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NotificationProvider } from '../providers/notification/notification';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SearchProvider } from '../providers/search/search';

const config : SocketIoConfig = { url: "http://192.168.1.103:3000", options : {} };


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AddProductSpecialPageModule,
    CheckoutPageModule,
    CartPageModule,
    ModifyProdSpecialPageModule,
    BoutiqueGeneralPageModule,
    ProductOfCategoryPageModule,
    OrderedPageModule,
    MyOrdersPageModule,
    DetailOrdersPageModule,
    MyNotifPageModule,
    DetailNotifPageModule,
    ShopToSharePageModule,
    ModifyCouverturePageModule,
    ModifyProdPageModule,
    ListProdPageModule,
    DetailProductPageModule,
    DetailProductPageModule,
    SearchWithProductPageModule,
    SearchPageModule,
    MessageContentPageModule,
    MessageMenuPageModule,
    ModifyProfilePageModule,
    WelcomePageModule,
    ProductSharedPageModule,
    ProductToSharePageModule,
    ProductAddedPageModule,
    AddProductPageModule,
    AddCategoryPageModule,
    BoutiqueCreatedPageModule,
    BoutiquePageModule,
    CreateBoutiquePageModule,
    ProfilePageModule,
    LoginPageModule,
    PasswordForgetPageModule,
    PasswordValidationPageModule,
    RegisterPageModule,
    PasswordModifyPageModule,
    MyShopPageModule,
    SharePageModule,
    SearchWithShopPageModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    StoreProvider,
    OrderProvider,
    LocalNotifications,
    NotificationProvider,
    SocialSharing,
    SearchProvider,
    Deeplinks,
    CallNumber,
    SocketProvider
  ]
})
export class AppModule {}
