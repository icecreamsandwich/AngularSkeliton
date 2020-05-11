import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

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
    if (!this.login.username || !this.login.password) {
      swal.fire("Failed", "Please enter Username and Password", "error");
    } else {
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
              this.authService.userType.next(result.roles[0])
              this.authService.isAuthenticatedV.next(true)
              console.log('logged in successfully');
              //sets the user as admin
              if (result.roles.includes("ROLE_ADMIN")) {
                this.authService.setAdmin(true)
              }
              this.router.navigate(['/home']);
            } else {
              this.router.navigate(['/']);
            }

          },
          error => {
            // console.log(error);
            const errorResponse = JSON.parse(JSON.stringify(error)).error
            swal.fire("Failed", errorResponse.message, "error");
          }
        );
      }
    }

  }
}
