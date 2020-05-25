import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ProdutoDTO } from "../../models/produto.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoria_id: string, page: number = 0, lines: number = 24)  {
    return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${categoria_id}&page=${page}&linesPerPage=${lines}`);
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
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/products/${produto_id}`);
  }

  insert(produto) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/products`,
      produto,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  update(produto) {
    return this.http.put(
      `${API_CONFIG.baseUrl}/products/${produto.id}`,
      produto,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  remove(product_id: string): Observable<any>{
    return this.http.delete(
      `${API_CONFIG.baseUrl}/products/${product_id}`,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }
}