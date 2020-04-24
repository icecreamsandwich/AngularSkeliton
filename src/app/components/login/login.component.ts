import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginContact() {

    const data = {
      username: this.login.username,
      password: this.login.password
    };
    if (data) {
      this.authService.signIn(data).subscribe(
        res => {
          const result = JSON.parse(JSON.stringify(res));
          if (result) {
            localStorage.setItem('token', result.accessToken);
            localStorage.setItem('userName', result.username);
            localStorage.setItem('roles', result.roles);
            console.log('logged in successfully');
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/']);
          }

        },
        error => {
         // console.log(error);
          const errorResponse = JSON.parse(JSON.stringify(error)).error
          alert('Signin failed :' +errorResponse.message)
        }
      );
    }
  }
}
