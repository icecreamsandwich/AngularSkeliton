import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ProfileService } from 'src/app/_services/profile.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../../../assets/css/shared.css']
})
export class UsersComponent implements OnInit {
  users: any
  constructor(private authService: AuthService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.profileService.getAllUsers().subscribe(
      response => {
        console.log(response);
        this.users = JSON.parse(JSON.stringify(response)).data
      }, error => {
        console.log(error)
        const errorResponse = JSON.parse(JSON.stringify(error)).error
        swal.fire("Failed", errorResponse.message, "error");
      }
    )
  }

  changeUserStatus(e, id, status) {
    const data = {
      userId: id,
      status: status
    }
    this.profileService.changeUserStatus(data).subscribe(
      response => {
        console.log(response);
        const responseData = JSON.parse(JSON.stringify(response));
        swal.fire('Success', responseData.message, "success");
        this.ngOnInit();
      },
      error => {
        console.log(error);
        const errorResponse = JSON.parse(JSON.stringify(error)).error
        swal.fire("Failed", errorResponse.message, "error");
      }
    )
  }

}
