import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { AlertService } from '../../services/alert.service';

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
  client: ClienteDTO = new ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public clienteService: ClienteService,
    public altertCtrl: AlertService) {

    this.client = this.navParams.get("client");
    
    this.formGroup = this.formBuilder.group({
      name: [this.client.name, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      clientType: [this.client.clientType, [Validators.required]],
      cpfCnpj: [this.client.cpfCnpj, [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      phone1: [this.client.phones[0], [Validators.required]],
      phone2: [this.client.phones[1], []],
      phone3: [this.client.phones[2], []],
    });
  }

  ionViewDidLoad() {
    let id: string;
    id = this.getIdRadioClientType(this.client.clientType);
    this.formGroup.controls.clientType.setValue(id);
  }


  updateUser() {
    let cliente: ClienteDTO = this.clienteService.chargeClientbyForm(this.formGroup.value, this.client.addresses);
    this.clienteService.update(cliente, this.client.id)
      .subscribe(response => {
        this.updateOk();
        this.navCtrl.pop();
      },
        error => { });
  }

  updateOk() {
    let alert = {
      title: 'Sucesso.',
      message: 'Dados alterados com sucesso.',     
      event: () => this.navCtrl.setRoot("ProfilePage")
    }
    this.altertCtrl.showAlert(alert);
  }

  goToAddress() {
    this.navCtrl.push("NewAddressPage", { parentPage: this, enderecosList: this.client.addresses });
  }

  chargeAddress(enderecos) {
    this.client.addresses = enderecos;
  }

  removeAddress(endereco) {
    var index = this.client.addresses.indexOf(endereco);
    this.client.addresses.splice(index, 1);
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
