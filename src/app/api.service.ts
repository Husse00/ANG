import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api: string = 'https://medieinstitutet-wie-products.azurewebsites.net/api/products';
  ordersApi: string = "https://medieinstitutet-wie-products.azurewebsites.net/api/orders";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.api);
  }

  getMovie(id: number)
  {
    return this.http.get(this.api + "/" + id);
  }

  getOrders(companyId: number)
  {
    return this.http.get(this.ordersApi + "?companyId=" + companyId);
  }
}