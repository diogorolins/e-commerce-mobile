import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { EnderecoDTO } from '../../models/endereco.dto';


@IonicPage()
@Component({
  selector: 'page-new-address',
  templateUrl: 'new-address.html',
})
export class NewAddressPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  cityDto: CidadeDTO = new CidadeDTO;
  parentPage;
  listEnderecos: EnderecoDTO[];
  endereco: EnderecoDTO = new EnderecoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService) {

    this.formGroup = this.formBuilder.group({
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      compl: [''],
      neighborhood: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      stateId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
     
    });
  }

  ionViewDidLoad() {
    this.parentPage = this.navParams.get("parentPage");
    this.listEnderecos = this.navParams.get("enderecosList");
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.stateId.setValue(this.estados[0].id);
        this.updateCidades();
      },
        error => { });
  }

  updateCidades() {
    let estadoId = this.formGroup.value.stateId
    this.cidadeService.findAll(estadoId)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cityId.setValue(null);
      },
        error => { });
  }

  addAddress(){

    this.endereco.street = this.formGroup.controls.street.value;
    this.endereco.number = this.formGroup.controls.number.value;
    this.endereco.compl = this.formGroup.controls.compl.value;
    this.endereco.neighborhood = this.formGroup.controls.neighborhood.value;
    let position = this.formGroup.controls.cityId.value.indexOf('-');
    this.cityDto.id = this.formGroup.controls.cityId.value.substring(0, position);
    this.cityDto.name = this.formGroup.controls.cityId.value
      .substring(position + 1, this.formGroup.controls.cityId.value.length);
    this.endereco.city = this.cityDto;
    this.endereco.zipCode = this.formGroup.controls.zipCode.value;
    this.listEnderecos.push(this.endereco);
    this.parentPage.chargeAddress(this.listEnderecos);
    this.navCtrl.pop();
  }

}
