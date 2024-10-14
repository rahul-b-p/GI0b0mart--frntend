import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl = 'http://localhost:4000'

  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)

  constructor(private http: HttpClient) {
    if(sessionStorage.getItem('token')){
      this.getWishlistCount()
      this.getCartCount()
    }
   }

  allProductsApi() {
    return this.http.get(`${this.serverUrl}/all-product`)
  }

  getOneProductApi(id: any) {
    return this.http.get(`${this.serverUrl}/getproduct/${id}`)
  }

  registerUserApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/register`, reqBody)
  }

  loginUserApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/login`, reqBody)
  }

  addTokentoHeader() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token')
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  addToWishlistApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/add-wishlist`, reqBody, this.addTokentoHeader())
  }

  getWishlistItemApi() {
    return this.http.get(`${this.serverUrl}/wishlist-items`,this.addTokentoHeader())
  }

  getWishlistCount() {
    this.getWishlistItemApi().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  deleteWishlistItemApi(id:any) {
    return this.http.delete(`${this.serverUrl}/wishlist-remove/${id}`)
  }

  addToCartApi(reqBody:any) {
    return this.http.post(`${this.serverUrl}/add-cart`, reqBody, this.addTokentoHeader())
  }

  getCartItemsApi(){
    return this.http.get(`${this.serverUrl}/get-cart`,this.addTokentoHeader())
  }

  getCartCount(){
    this.getCartItemsApi().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
  }

  deleteCartItemApi(id:any) {
    return this.http.delete(`${this.serverUrl}/delete-cart-item/${id}`)
  }

  incerementCartItemApi(id:any) {
    return this.http.get(`${this.serverUrl}/inc-item/${id}`)
  }

  decerementCartItemApi(id:any) {
    return this.http.get(`${this.serverUrl}/dec-item/${id}`)
  }
}
