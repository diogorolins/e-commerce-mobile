import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/domain/cliente.service';
import { AlertService } from '../../services/alert.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  enderecosDto: EnderecoDTO[] = []; 
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public clienteService: ClienteService,
    public altertService: AlertService) {
      
      this.formGroup = this.formBuilder.group({
        name: ['diogo', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['diogo@diogo', [Validators.email, Validators.required]],
        password: ['1', [Validators.required]],
        passwordConfirm: ['1', [Validators.required]],
        clientType: ['1', [Validators.required]],
        cpfCnpj: ['09475414703', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        phone1: ['2121', [Validators.required]],
        phone2: ['', []],
        phone3: ['', []]
      }, { validator: this.matchingPasswords('password', 'passwordConfirm') });
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  ionViewDidLoad(){

  }

  signupUser(){
    if (this.enderecosDto.length == 0) {
      let alert = {
        title: 'Erro.',
        message: 'Registre pelo menos 1 endereço.'
      }
      this.altertService.showAlert(alert);
      
    } else {  
      let cliente: ClienteDTO = this.clienteService.chargeClientbyForm(this.formGroup.value, this.enderecosDto);
      this.clienteService.insert(cliente)
        .subscribe(response => {
          this.insertOk();
          this.navCtrl.pop();
        },
          error => { });
    }   
  }

  insertOk() {
    let alert = {
      title: 'Sucesso.',
      message: 'Cadastro efetuado com sucesso.'
    }
    this.altertService.showAlert(alert);
  }

  goToAddress() {
    this.navCtrl.push("NewAddressPage", { parentPage: this, enderecosList: this.enderecosDto});
  }

  chargeAddress(enderecos){
    this.enderecosDto = enderecos;
  }

  removeAddress(endereco) {
    var index = this.enderecosDto.indexOf(endereco);
    this.enderecosDto.splice(index, 1);
  }

}
