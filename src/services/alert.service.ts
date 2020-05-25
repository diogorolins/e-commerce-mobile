import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";


@Injectable()
export class AlertService {

  constructor(public alertCtrl: AlertController) {
  }

  showAlert(objAlert){
    let alert = this.alertCtrl.create({
      title: objAlert.title,
      message: objAlert.message,
      enableBackdropDismiss: false,
      cssClass: objAlert.class ,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }
  
  showConfirmation(objConfirm){
    let alert = this.alertCtrl.create({
      title: objConfirm.title,
      message: objConfirm.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: objConfirm.event
        },
        { text: 'Cancel' }
      ]
    });
    alert.present();
  }
  
}