import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {

  constructor(private api:ApiService) {}

  allProducts:any=[]
  token:any=""

  ngOnInit(): void {
    this.token=sessionStorage.getItem('token')
    this.getWishlistItem()
  }

  getWishlistItem() {
    this.api.getWishlistItemApi().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.allProducts=res
      },
      error:(err:any)=>{
        console.log(err); 
      }
    })
  }

  removeWishlidstItem(id:any) {
    this.api.deleteWishlistItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getWishlistItem()
        this.api.getWishlistCount()
      },
      error:(err:any)=>{
        console.log(err);
        alert('Something went wrong')
      }
    })
  }

  addToCart(product: any) {
    if (sessionStorage.getItem('token')) {
      this.api.addToCartApi(product).subscribe({
        next: (res: any) => {
          // console.log(res);
          this.api.getCartCount()
          this.removeWishlidstItem(product._id)
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
