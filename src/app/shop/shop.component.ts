
import { Component, OnInit, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: '../shop/shop.component.html',
  styleUrls: ['../shop/shop.component.css'],
})

export class ShopComponent implements OnInit {
  title = 'shop';

  public data: any = [];

  constructor(private api: ApiService) {}

  // hämtar filmerna från api när sidan laddas
  ngOnInit(): void {
    this.api.getAll().subscribe((results: any) => {
      this.data = results;
    });
  }

  // lägger till film data till Localstorage
  addToCart(id: number): void {
    let cartString = localStorage.getItem('movieCart');

    if (cartString == null) {
      let cartList = [id];
      localStorage.setItem('movieCart', JSON.stringify(cartList));

      return;
    }

    let cart = JSON.parse(cartString);
    // om film id inte redan finns så läggs den till
    if (cart.includes(id) == false) {
      cart.push(id);
    }

    localStorage.setItem('movieCart', JSON.stringify(cart));
  }
}
