import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  paymentStatus :any = false
  public payPalConfig ? : IPayPalConfig;

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){}

  checkForm = this.fb.group({
    uname:["",[Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    flat:["",[Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
    place:["",[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    pincode:["",[Validators.required, Validators.pattern('[0-9]]*')]]
  })

  payment(){
    this.paymentStatus=true
    this.initConfig()
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: '9.99'
                        }
                    }
                },
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        // on approval
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
        },
        // payment successfully
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          // call empty cart(CHANGE behaviour subject)
          alert('Payment Successful')

        },
        // payment failed
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            alert('your payment is unsuccessful, PLease try after sometimes')

        },
        // gateway error
        onError: err => {
            console.log('OnError', err);
            alert('your payment is unsuccessful, PLease try again')
        },
        // server side error
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
      }
    }

}
