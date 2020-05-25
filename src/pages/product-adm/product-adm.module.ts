import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductAdmPage } from './product-adm';

@NgModule({
  declarations: [
    ProductAdmPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductAdmPage),
  ],
})
export class ProductAdmPageModule {}
