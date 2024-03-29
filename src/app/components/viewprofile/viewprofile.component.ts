import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/_services/profile.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css', '../../../assets/css/shared.css']
})
export class ViewprofileComponent implements OnInit {
  profile = {
    username: '',
    email: '',
    role: '',
  }
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    const data = {
      username: localStorage.getItem("userName")
    }
    this.profileService.findUser(data).subscribe(response => {
      const jsonResponse = JSON.parse(JSON.stringify(response))
      this.profile = jsonResponse.data
      this.profile.role = jsonResponse.data.roles[0].name
    }, error => {
      console.log(error)
      const errorResponse = JSON.parse(JSON.stringify(error)).error
      swal.fire("Failed", errorResponse.message, "error");
    })
  }

}
