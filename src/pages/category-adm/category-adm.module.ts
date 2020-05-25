import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryAdmPage } from './category-adm';

@NgModule({
  declarations: [
    CategoryAdmPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryAdmPage),
  ],
})
export class CategoryAdmPageModule {}
