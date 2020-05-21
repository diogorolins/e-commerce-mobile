import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminMenuPage } from './admin-menu';

@NgModule({
  declarations: [
    AdminMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminMenuPage),
  ],
})
export class AdminMenuPageModule {}
