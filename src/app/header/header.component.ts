import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  wishlistCountHeader: number = 0
  
  cartCountHeader: number = 0

  token:any = sessionStorage.getItem('token')

  constructor(private api:ApiService) {}

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.api.wishlistCount.subscribe((res:any)=>{
        this.wishlistCountHeader=res
      })
      this.api.cartCount.subscribe((res:any)=>{
        this.cartCountHeader=res
      })
    }
  }

}
