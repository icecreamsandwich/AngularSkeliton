import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../../../assets/css/shared.css']
})
export class SignupComponent implements OnInit {
  signup = {
    username: '',
    email: '',
    password: '',
    role: ''
  }
  message : any
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    const data = {
      username: this.signup.username,
      email: this.signup.email,
      password: this.signup.password,
      role: [this.signup.role]
    }

    this.authservice.signUp(data).subscribe(response => {
      console.log(response)
      var jsonResponse = JSON.parse(JSON.stringify(response))
      localStorage.setItem('userName', jsonResponse.data.username)
      console.log('User registered successfully');
      this.message = 'User registered successfully'
      this.router.navigate(['/signup']);
    }, error => {
      console.log(error)
    })
  }

}
