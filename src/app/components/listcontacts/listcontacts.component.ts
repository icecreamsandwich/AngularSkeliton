import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from '../../_services/contact-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

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
    private authService : AuthService
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
        if(error.statusText == "Unauthorized"){
          this.authService.signOut()
          this.router.navigate(['/login']);
        }
      }
    );
  }

  editContact() {

  }

  deleteContact(e, id) {
    const deleteConfirm = confirm('Are you sure to delete this user?');
    if (deleteConfirm && id) {
      const data = {
        userId: id
      };
      this.contactService.delete(data).subscribe(
        response => {
          console.log(response);
          const responseData = JSON.parse(JSON.stringify(response));
          if (responseData.message == 'Unauthorized!' || responseData.message == 'No token provided!') {
            alert('You are unauthorized to perform this operation');
          } else {
            alert(responseData.message);
            this.router.navigate(['/listContact']);
          }
        },
        error => {
          console.log(error);
          if(error.statusText == "Unauthorized!"){
            this.authService.signOut()
          }
        }
      );
    }
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
        if(error.statusText == "Unauthorized!"){
          this.authService.signOut()
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
