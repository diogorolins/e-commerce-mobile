import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EnderecoDTO } from '../../models/endereco.dto';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  client : ClienteDTO;
  picture: string;
  cameraOn: boolean = false;
  mais: boolean = false;
  addresses: EnderecoDTO[];
  isAdm: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClienteService,
    private camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email)
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.client = response as ClienteDTO;    
          this.addresses = this.client.addresses;
          this.isAdm = this.client.roles.findIndex(e => e == "ADMIN");
          this.client.cpfCnpj = this.formatCnpjCpf(this.client.cpfCnpj);
          this.getImageIfExists();
        },
          error => {
            this.navCtrl.setRoot("HomePage")
          });
    else {
      this.navCtrl.setRoot("HomePage")
    }
    
  }

  getImageIfExists() {
    this.clientService.getImageFromBucket(this.client.id)
      .subscribe(response => {
        this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`
      },
        error => {

    });
  }

  getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.picture = 'data:image/png;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
    this.cameraOn = false;
  }

  sendPicture(){
    this.clientService.uploadPicture(this.picture)
      .subscribe(response => {
        this.loadData();
        this.picture = null;
      },
      error => {})
  }

  cancel() {
    this.picture = null;
  }

  formatCnpjCpf(value) {
    const cnpjCpf = value.replace(/\D/g, '');
    if (cnpjCpf.length === 11) {
      return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
    }
    return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
  }

  showAddress() {
    if(!this.mais){
      this.mais = true;
    } else {
      this.mais = false;
    }
  }

  goToUpdate() {
    this.navCtrl.push("UpdateProfilePage", {client: this.client});
  }

  goToAdmin() {
    this.navCtrl.setRoot("AdminMenuPage");
  }

}
