import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";
import { EnderecoDTO } from "../../models/endereco.dto";
import { CidadeDTO } from "../../models/cidade.dto";

@Injectable()
export class ClienteService {
  

  constructor(
    public http: HttpClient, 
    public storage : StorageService,
    public imageUtilService: ImageUtilService) {    
  }

  findByEmail(email: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/clients/email/?email=${email}`);
  }

  findById(id: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/clients/${id}`);
  }

  insert(obj: ClienteDTO){
    return this.http.post(
      `${API_CONFIG.baseUrl}/clients`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  update(obj: ClienteDTO, id:string) {
    return this.http.put(
      `${API_CONFIG.baseUrl}/clients/${id}`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  chargeClientbyForm(form, enderecos) {
    let client: ClienteDTO = new ClienteDTO;
    let phones: string[] = [];
    client.name = form.name;
    client.email = form.email;
    client.cpfCnpj = form.cpfCnpj;
    client.password = form.password;
    client.clientType = form.clientType;
    phones.push(form.phone1);
    phones.push(form.phone2);
    phones.push(form.phone3);
    client.phones = phones;
    client.addresses = enderecos;
    return client;
    
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }

  uploadPicture(picture) {
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    console.log(pictureBlob);
    
    let formData: FormData = new FormData();
    formData.set("file", pictureBlob, "file.png");
    return this.http.post(
      `${API_CONFIG.baseUrl}/clients/picture`,
      formData,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

}