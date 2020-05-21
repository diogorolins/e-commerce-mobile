import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  email: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    
  }

  sendNewPassword() {
    this.authService.sendNewPassword(this.email)
      .subscribe(response => {
        this.sendAlert();
      }, error => {})
    
  }

  sendAlert() {
    let alert = this.alertCtrl.create({
      title: "Envio de email",
      message: "Nova senha enviada com sucesso.",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
