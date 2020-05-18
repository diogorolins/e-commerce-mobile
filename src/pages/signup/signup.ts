import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public clienteService: ClienteService,
    public altertCtrl: AlertController) {
      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
        clientType: ['', [Validators.required]],
        cpfCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        compl: ['', []],
        neighborhood: ['', []],
        zipCode: ['', [Validators.required]],
        phone1: ['', [Validators.required]],
        phone2: ['', []],
        phone3: ['', []],
        stateId: ['', [Validators.required]],
        cityId: ['', [Validators.required]],
      });
  }

  ionViewDidLoad(){
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.stateId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
  }

  updateCidades() {
    let estadoId = this.formGroup.value.stateId
    this.cidadeService.findAll(estadoId)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cityId.setValue(null);
      },
        error => {});
  }

  signupUser(){
    console.log(this.formGroup.value);
  
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.insertOk();
      },
      error => {});
  }

  insertOk() {
    let alert = this.altertCtrl.create({
      title: 'Sucesso.',
      message: 'Cadastro efetuado com sucesso.',
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
