import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/_services/profile.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css', '../../../assets/css/shared.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgot = {
    email: ''
  }
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    const data = {
      email: this.forgot.email
    }
    this.profileService.forgotPassword(data).subscribe(
      response => {
        const result = JSON.parse(JSON.stringify(response))
        console.log(result)
        if(result.status == "success"){
          swal.fire("Success", result.message, "success")
        }else{
          swal.fire("Failure", result.message, "error")
        }
        
      }, error => {
        console.log(error)
        const errorResponse = JSON.parse(JSON.stringify(error)).error
        swal.fire("Failure", errorResponse.message, "error")
      }
    )
  }

}
