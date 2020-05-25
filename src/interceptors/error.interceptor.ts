import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; 
import { StorageService } from '../services/storage.service';
import { FieldMessage } from '../models/fieldMessage';
import { AlertService } from '../services/alert.service';
import { ProdutoService } from '../services/domain/produto.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  constructor(
    public strorage: StorageService, 
    public alertCtrl: AlertService,
    public produtoService: ProdutoService) {
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
          case 400:
            this.handle400(errorObj);
            break;
          case 403:
            this.handle403();
            break;
          case 404:
            this.handle404(errorObj);
            break;
          case 422:
            this.handle422(errorObj);
            break;
          default:
            this.handleDefaultError(errorObj);
        }  
        return Observable.throw(errorObj);
      }) as any;
  }

  handle422(errorObj) {
    let objAlert = {
      title: 'Erro de Validação',
      message: this.listErrors(errorObj.errors)
    }
    this.alertCtrl.showAlert(objAlert);   
  }

  listErrors(message: FieldMessage[]): string {
    let s : string = '';
    for (var i=0; i<message.length; i++){
      s += '<p><strong>' + message[i].fieldName + ': </strong>'+ message[i].message + '</p>';
    }
    return s;
  }

  handle404(errorObj) {
    let objAlert = {
      title: 'Não encontrado',
      message: errorObj.message
    }
    this.alertCtrl.showAlert(objAlert);  
  }

  handle400(errorObj) {
    console.log(errorObj);
    if (errorObj.error == "Problema de integridade de dados"){
      let objAlert = {
      title: 'Não permitido.',
      message: `O Item ${errorObj.message} possui referências.`,
      class: 'alertDanger'
    }
    this.alertCtrl.showAlert(objAlert);  
    }
  }

  handleDefaultError(errorObj) {
    let objAlert = {
      title: `Erro ${errorObj.status}: ${errorObj.error}`,
      message: errorObj.message
    }
    this.alertCtrl.showAlert(objAlert);  
  }

  handle401() {
    let objAlert = {
      title: 'Falha na autenticação',
      message: 'Email ou senha incorretos'
    }
    this.alertCtrl.showAlert(objAlert);  
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