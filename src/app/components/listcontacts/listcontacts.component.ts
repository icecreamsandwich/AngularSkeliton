import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from '../../_services/contact-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-listcontacts',
  templateUrl: './listcontacts.component.html',
  styleUrls: ['./listcontacts.component.css']
})
export class ListcontactsComponent implements OnInit {

  contacts: any;
  username: '';
  // dependancy Injection
  constructor(private contactService: ContactServiceService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactService.getAll().subscribe(
      response => {
        console.log(response);
        this.contacts = JSON.parse(JSON.stringify(response)).data;
      },
      error => {
        console.log(error);
        console.log(error.statusText)
        if (error.statusText == "Unauthorized") {
          this.authService.signOut()
          this.router.navigate(['/login']);
          location.reload()
        }
      }
    );
  }

  editContact() {

  }

  deleteContact(e, id) {
    swal.fire({
    title: 'Are you sure to delete this contact?',
    showConfirmButton: true,
    showCancelButton: true}).then(result => {
      if (result.value && id) {
        // handle Confirm button click
        // result.value will contain `true` or the input value
        const data = {
          userId: id
        };
        this.contactService.delete(data).subscribe(
          response => {
            console.log(response);
            const responseData = JSON.parse(JSON.stringify(response));
            if (responseData.message == 'Unauthorized!' || responseData.message == 'No token provided!') {
              swal.fire("Failed", responseData.message, "error"); 
            } else {
              swal.fire('Success', responseData.message, "success");
              this.ngOnInit();
            }
          },
          error => {
            console.log(error);
            const errorResponse = JSON.parse(JSON.stringify(error)).error
            swal.fire("Failed", errorResponse.message, "error"); 
            if (error.statusText == "Unauthorized!") {
              this.authService.signOut()
            }
          }
        );
        
      } else {
        // handle dismissals
        // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
      }
    })
  }

  searchContact() {
    const data = {
      username: this.username
    };
    this.contactService.findByName(data).subscribe(
      response => {
        const responseData = JSON.parse(JSON.stringify(response)).data;
        console.log(responseData);
        if (responseData[0] == undefined) {
          this.contacts = '';
        } else { this.contacts = responseData; }
      },
      error => {
        console.log(error);
        if (error.statusText == "Unauthorized!") {
          this.authService.signOut()
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
