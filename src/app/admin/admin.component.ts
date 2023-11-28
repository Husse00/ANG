import { Component, OnInit, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: '../admin/admin.component.html',
  styleUrls: ['../admin/admin.component.css'],
})
export class AdminComponent implements OnInit {
  public CompanyId: number = 171;
  public Orders: any = [];

  constructor(private api: ApiService) {}

  // Hämtar alla orderar från companyId
  async ngOnInit() {
    this.Orders = await this.api.getOrders(this.CompanyId).toPromise();

    this.Orders.forEach((order: any) => {
      order.orderRows.forEach(async (orderRow: any) => {
        orderRow.product = await this.api.getMovie(orderRow.productId).toPromise();
      });
    });
  }
}
