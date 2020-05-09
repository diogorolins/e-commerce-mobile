import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

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
    public cidadeService: CidadeService) {
      this.formGroup = this.formBuilder.group({
        name: ['Diogo', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['diogorolins@hotmail.com', [Validators.email, Validators.required]],
        password: ['123456', [Validators.required]],
        clientType: ['1', [Validators.required]],
        cpfCnpj: ['09475414703', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        street: ['Rua teste', [Validators.required]],
        number: ['10', [Validators.required]],
        compl: ['', []],
        neighborhood: ['', []],
        zipCode: ['20260142', [Validators.required]],
        phone1: ['999999999', [Validators.required]],
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
    console.log("enviou o form");    
  }

}
