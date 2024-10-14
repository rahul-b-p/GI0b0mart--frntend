import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  allProducts: any = []
  token: any = ""
  grandTotal:number=0



  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getCartItems()
    this.token = sessionStorage.getItem('token')
  }

  getCartItems() {
    this.api.getCartItemsApi().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.allProducts = res
        this.getGrandTotal(this.allProducts)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  deleteCartItem(id: any) {
    if (sessionStorage.getItem('token')) {
      this.api.deleteCartItemApi(id).subscribe({
        next: (res: any) => {
          this.getCartItems()
          this.api.getCartCount()
        },
        error: (err: any) => {
          alert('Something Went wrong')
        }
      })
    }
    else {
      alert('Please Login')
    }
  }

  incrementCarItem(id: any) {
    if (sessionStorage.getItem('token')) {
      this.api.incerementCartItemApi(id).subscribe({
        next: (res: any) => {
          this.getCartItems()
        },
        error: (err: any) => {
          alert('Somthing went wrong')
        }
      })
    }
    else {
      alert('Please Login')
    }
  }

  decrementCarItem(id: any) {
    if (sessionStorage.getItem('token')) {
      this.api.decerementCartItemApi(id).subscribe({
        next: (res: any) => {
          this.getCartItems()
          this.api.getCartCount()
        },
        error: (err: any) => {
          alert('Somthing went wrong')
        }
      })
    }
    else {
      alert('Please Login')
    }
  }

  getGrandTotal(allProducts:any){
    this.grandTotal=Math.ceil(allProducts.map((item:any)=>item.grandTotal).reduce((n1:any,n2:any)=>n1+n2))
  }

}
