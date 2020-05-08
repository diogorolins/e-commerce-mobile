import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public strorage: StorageService, public alertCtrl: AlertController) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error, caught) => {
        let errorObj = error;
        
        if(errorObj.error)
          errorObj = errorObj.error;
        if(!errorObj.status)
          errorObj = JSON.parse(errorObj);
        
        switch (errorObj.status) {
          case 401:
            this.handle401();
            break;
          case 403:
            this.handle403();
            break;
          case 404:
            this.handle404();
            break;
          default:
            this.handleDefaultError(errorObj);
        }  
        return Observable.throw(errorObj);
      }) as any;
  }
  handle404() {
    let alert = this.alertCtrl.create({
      title: 'Erro na página',
      message: 'Página não encontrada',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }
  handleDefaultError(errorObj) {
    let alert = this.alertCtrl.create({
      title: `Erro ${errorObj.status}: ${errorObj.error}` ,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  handle401() {
    let alert = this.alertCtrl.create({
      title: 'Falha na autenticação',
      message: 'Email ou senha incorretos',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  handle403() {
    this.strorage.setLocalUser(null);
  }
}
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};