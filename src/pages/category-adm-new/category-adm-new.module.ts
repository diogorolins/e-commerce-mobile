import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryAdmNewPage } from './category-adm-new';

@NgModule({
  declarations: [
    CategoryAdmNewPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryAdmNewPage),
  ],
})
export class CategoryAdmNewPageModule {}
