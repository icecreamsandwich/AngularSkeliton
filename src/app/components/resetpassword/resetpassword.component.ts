import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css', '../../../assets/css/shared.css']
})
export class ResetpasswordComponent implements OnInit {

  user = {
    username : '',
    password : '',
    newpassword : '',
  }
  message: string
  success_message : string
  submitted : boolean = false
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  changePassword() {
    const data = {
      username: this.user.username,
      password: this.user.password,
      newpassword: this.user.newpassword,
    }
    this.profileService.resetPassword(data).subscribe(resonse => {
      console.log(resonse)
      const result = JSON.parse(JSON.stringify(resonse))
      if(result.status == "success"){
        this.success_message = result.message
        this.submitted = true
      }else{
        this.message = result.message
        this.submitted = false
      }
      
    }, error => {
      console.log(error)
      const errorResponse = JSON.parse(JSON.stringify(error)).error
      this.message = errorResponse.message
    })
  }
}
