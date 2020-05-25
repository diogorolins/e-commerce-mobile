import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { CategoriaDTO } from "../../models/categoria.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class CategoriaService {

  constructor(public http: HttpClient){
  }

  findAll(): Observable<CategoriaDTO[]>{
       return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categories`);
  }

  findById(id:string) {
    return this.http.get(`${API_CONFIG.baseUrl}/categories/${id}`);
  }

  insert(categoria){
    return this.http.post(
      `${API_CONFIG.baseUrl}/categories`,
      categoria,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  update(categoria) {
    return this.http.put(
      `${API_CONFIG.baseUrl}/categories/${categoria.id}`,
      categoria,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  remove(categoria_id: string): Observable<any> {
    return this.http.delete(
      `${API_CONFIG.baseUrl}/categories/${categoria_id}`,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }
  
  getImageFromBucket(id: string): Observable<any> {
    return this.http.get(
      `${API_CONFIG.bucketBaseUrl}/cate${id}.jpg`, 
      { responseType: 'blob' });
  }


}