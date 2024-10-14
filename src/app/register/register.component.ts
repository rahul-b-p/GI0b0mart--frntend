import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder, private api: ApiService, private router:Router) { }

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  register() {
    if (this.registerForm.valid) {
      // console.log(this.registerForm.value);
      this.api.registerUserApi(this.registerForm.value).subscribe({
        next: (res: any) => {
          alert('Registered Successfull')
          this.router.navigateByUrl('/login')
        },
        error: (err: any) => {
          if (err.status==406) {
            alert(err.error)
          } else {
            alert('Something went wrong')
          }
        }
      })

    }
    else {
      alert('Please check the input fields')
    }
  }
}
