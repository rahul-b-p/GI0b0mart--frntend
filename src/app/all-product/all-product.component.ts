import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  constructor(private api: ApiService) { }
  allProduct: any = []

  ngOnInit(): void {
    this.getAllProducts()
    // console.log(this.allProduct);

  }

  getAllProducts() {
    this.api.allProductsApi().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.allProduct = res
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  addToWishList(product: any) {
    if (sessionStorage.getItem('token')) {
      this.api.addToWishlistApi(product).subscribe({
        next: (res: any) => {
          // console.log(res);
          this.api.getWishlistCount()
          alert('Product Added Successfully')
        },
        error: (err: any) => {
          // console.log(err);
          if (err.status == 406) {
            alert(err.error)
          }
          else {
            alert('Something went wrong')
          }
        }
      })
    }
    else {
      alert('Please Login to add Item into your cart')
    }
  }

  addToCart(product: any) {
    if (sessionStorage.getItem('token')) {
      this.api.addToCartApi(product).subscribe({
        next: (res: any) => {
          // console.log(res);
          this.api.getCartCount()
          alert('Product Added Successfully')
        },
        error: (err: any) => {
          console.log(err);
          if (err.status == 406) {
            alert(err.error)
          }
          else {
            alert('Something went wrong')
          }
        }
      })
    }
    else {
      alert('Please Login')
    }
  }


}
