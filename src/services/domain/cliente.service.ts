import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

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