import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit  {

  public adminUserOrders: any = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadAllOrders();
  }

  loadAllOrders(): void {
    this.orderService.getAllUsersAndOrders().subscribe((data: any[]) => {
      this.adminUserOrders = data;
    });
  }

}
