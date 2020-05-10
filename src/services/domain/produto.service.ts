import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDto } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoria_id: string)  {
    return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${categoria_id}`);
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
    return this.http.get(url, { responseType: 'blob' });
  }

  findById(produto_id: string) {
    return this.http.get<ProdutoDto>(`${API_CONFIG.baseUrl}/products/${produto_id}`);
  }
}