import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  client: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public clienteService: ClienteService,
    public altertCtrl: AlertController) {

    this.client = this.navParams.get("client");
    
    this.formGroup = this.formBuilder.group({
      name: [this.client.name, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      clientType: [this.client.clientType, [Validators.required]],
      cpfCnpj: [this.client.cpfCnpj, [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      street: [this.client.addresses[0].street, [Validators.required]],
      number: [this.client.addresses[0].number, [Validators.required]],
      compl: [this.client.addresses[0].compl, []],
      neighborhood: [this.client.addresses[0].neighborhood, []],
      zipCode: [this.client.addresses[0].zipCode, [Validators.required]],
      phone1: [this.client.phones[0], [Validators.required]],
      phone2: [this.client.phones[1], []],
      phone3: [this.client.phones[2], []],
      stateId: [this.client.addresses[0].city.state.id, [Validators.required]],
      cityId: [this.client.addresses[0].city.id, [Validators.required]],
    });
  }

  ionViewDidLoad() {
    let id: string;
    id = this.getIdRadioClientType(this.client.clientType);
    this.formGroup.controls.clientType.setValue(id);
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.stateId.setValue(this.client.addresses[0].city.state.id);
        this.updateCidades();
      },
        error => { });
  }

  updateCidades() {
    let estadoId = this.formGroup.value.stateId
    this.cidadeService.findAll(estadoId)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cityId.setValue(this.client.addresses[0].city.id);
      },
        error => { });
  }

  updateUser() {

    this.clienteService.update(this.formGroup.value, this.client.id)
      .subscribe(response => {
        this.updateOk();
      },
        error => { });
  }

  updateOk() {
    let alert = this.altertCtrl.create({
      title: 'Sucesso.',
      message: 'Dados alterados com sucesso.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot("ProfilePage");
          }
        }
      ]
    });
    alert.present();
  }

  getIdRadioClientType(clientType: string) {   
    
    let id: string;
    switch (clientType) {
      case API_CONFIG.pessoaFisica:
        id = "1";
        break;
      case API_CONFIG.pessoaJuridica:
        id = "2";
        break;
      default:
        id = "";
        break;
    }
    console.log(id);
    return id;
  }
}
