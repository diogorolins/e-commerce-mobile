import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-admin-menu',
  templateUrl: 'admin-menu.html',
})
export class AdminMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
  }

  goToProduct() {
    this.navCtrl.setRoot("ProductAdmPage");
  }

  goToCategory() {
    this.navCtrl.setRoot("CategoryAdmPage");
  }

  back() {
    this.navCtrl.setRoot("ProfilePage");
  }

}
