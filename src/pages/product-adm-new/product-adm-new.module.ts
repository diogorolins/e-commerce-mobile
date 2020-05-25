import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductAdmNewPage } from './product-adm-new';

@NgModule({
  declarations: [
    ProductAdmNewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductAdmNewPage),
  ],
})
export class ProductAdmNewPageModule {}
