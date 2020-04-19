import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../_services/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {
    username : '',
    password : ''
  }
  submitted = false;
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  loginContact(){
    const data = {
      username : this.login.username,
      password : this.login.password
    }
    if(data){
      this.authService.signIn(data).subscribe(
        res => {
          var result = JSON.parse(JSON.stringify(res));
          var accessToken = result.accessToken;
          var userName = result.username
          localStorage.setItem("token", accessToken);
          localStorage.setItem("userName", userName);
          this.submitted = true;
          console.log("logged in successfully")
          this.router.navigate(['/home']);
        },
        error =>{
          alert("Sigin failed"+error)
          console.log(error)
        }
      )
    }
  }
}
