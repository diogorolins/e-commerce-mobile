import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';


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
    public alertService: AlertService) {
  }

  ionViewDidLoad() {
    
  }

  sendNewPassword() {
    this.authService.sendNewPassword(this.email)
      .subscribe(response => {
        this.sendAlert();
        this.navCtrl.pop();
      }, error => {})
    
  }

  sendAlert() {
    let alert = {
      title: "Envio de email",
      message: "Nova senha enviada com sucesso.",
      event: () => this.navCtrl.pop()
    };
    this.alertService.showAlert(alert);  
    
  }

}
