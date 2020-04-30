import { Component, OnInit } from '@angular/core';
import { Router, ResolveEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-resetpasswordrequest',
  templateUrl: './resetpasswordrequest.component.html',
  styleUrls: ['./resetpasswordrequest.component.css', '../../../assets/css/shared.css']
})
export class ResetpasswordrequestComponent implements OnInit {

  tokenVerified: any
  reset = {
    password: '',
    confirmpassword: ''
  }
  token: any
  constructor(private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params['token']);
      this.token = params['token']
    })
    this.verifyToken()
  }

  ngOnInit(): void {
  }

  verifyToken() {
    //check the route first, if the route is resetPassword Request
    // then verify the token
    this.tokenVerified = 'wait';
    const data = {
      token: this.token
    }
    this.authService.checkUserToken(data).subscribe(
      response => {
        const result = JSON.parse(JSON.stringify(response))
        console.log(result)
        if (result.status == "success") {
          this.tokenVerified = true;
        } else {
          this.tokenVerified = false;
        };
      }, error => {
        const errorResponse = JSON.parse(JSON.stringify(error)).error
        console.log(errorResponse.message)
        this.tokenVerified = false;
      })
  }

  resetPassword() {
    if (this.reset.password !== this.reset.confirmpassword) {
      swal.fire("Failure", "Passwords does not match", "error")
    } else {
      const data = {
        token: this.token,
        password: this.reset.password
      }
      this.authService.resetPasswordRequest(data).subscribe(
        response => {
          const result = JSON.parse(JSON.stringify(response))
          if (result.status == "success") {
            swal.fire("Success", result.message, "success")
          } else {
            swal.fire("Failure", result.message, "error")
          }
        }, error => {
          const errorResponse = JSON.parse(JSON.stringify(error)).error
          swal.fire("Failure", errorResponse.message, "error")
        }
      )
    }
  }

}
