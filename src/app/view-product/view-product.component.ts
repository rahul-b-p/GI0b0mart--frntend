import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{

  product:any={}

  constructor(private api:ApiService , private ARoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.ARoute.params.subscribe((res:any)=>{
      const {id} =res
      this.getProduct(id)
    })
  }

  getProduct(id:any) {
    this.api.getOneProductApi(id).subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.product=res
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  addToWishList() {
    if (sessionStorage.getItem('token')) {
      this.api.addToWishlistApi(this.product).subscribe({
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

  addToCart() {
    if (sessionStorage.getItem('token')) {
      this.api.addToCartApi(this.product).subscribe({
        next: (res: any) => {
          // console.log(res);
          this.api.getCartCount()
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
      alert('Please Login')
    }
  }
}
