import { Component, OnInit, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: '../cart/cart.component.html',
  styleUrls: ['../cart/cart.component.css'],
})
export class CartComponent implements OnInit {
  title = 'cart';

  CompanyId: number = 171;

  // formulär som kund ska fylla
  firstName: string = '';
  lastName: string = '';
  payMethod: string = 'Swish';

  public data: any = [];

  constructor(private api: ApiService, private http: HttpClient) {}

  // filmer hämtas med deras ID:n som är sparade i LS när sidan laddas
  async ngOnInit() {
    let cartItems = this.getCart();

    for (let item of cartItems) {
      let movie = await this.api.getMovie(item).toPromise();
      this.data.push(movie);
    }
  }

  // Hämtar listan med film ID:n från LS
  getCart(): any {
    let cartString = localStorage.getItem('movieCart');

    if (cartString == null) {
      return null;
    }

    return JSON.parse(cartString);
  }

  // funktion för att ta bort order
  removeCartItem(id: number): void {
    let cart = this.getCart();

    if (cart.includes(id)) {
      let itemIndex = this.data.findIndex((item: any) => item.id === id);

      cart.splice(itemIndex, 1);
      this.data.splice(itemIndex, 1);

      localStorage.setItem('movieCart', JSON.stringify(cart));
    }
  }

  // bygger ordern som ska skickas till api
  async sendOrder() {
    const headers = { 'Content-Type': 'application/json' };

    let date = new Date();
    let dateString =
      date.toLocaleDateString() + 'T' + date.toLocaleTimeString();

    let totalPrice = 0;

    let body: any = {
      companyId: this.CompanyId,
      created: dateString,
      createdBy: this.firstName + ' ' + this.lastName,
      paymentMethod: this.payMethod,
      totalPrice: 0,
      status: 0,
      orderRows: [],
    };

    // loopar igenom film datan och lägger till i orderrows genom att skapa upp ett objekt för varje film
    this.data.forEach((movie: any) => {
      totalPrice += movie.price;

      let orderRow = {
        productId: movie.id,
        product: null,
        amount: 1,
      };
      body.orderRows.push(orderRow);
    });

    body.totalPrice = totalPrice;

    await this.http
      .post<any>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders',
        body,
        { headers }
      )
      .toPromise();

    alert('Order lagd');
  }
}
