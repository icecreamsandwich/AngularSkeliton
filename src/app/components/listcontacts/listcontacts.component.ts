import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from '../../_services/contact-service.service';

@Component({
  selector: 'app-listcontacts',
  templateUrl: './listcontacts.component.html',
  styleUrls: ['./listcontacts.component.css']
})
export class ListcontactsComponent implements OnInit {

  contacts: any;
  username: '';
  // dependancy Injection
  constructor(private contactService: ContactServiceService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(){
    this.contactService.getAll().subscribe(
      response => {
        console.log(response);
        this.contacts = JSON.parse(JSON.stringify(response)).data;
      },
      error => {
        console.log(error);
      }
    );
  }

  editContact(){

  }

  searchContact(){
    const data = {
      username : this.username
    };
    this.contactService.findByName(data).subscribe(
      response => {
        const responseData = JSON.parse(JSON.stringify(response)).data;
        console.log(responseData);
        if(responseData[0] == undefined){
          this.contacts = ""
        }else this.contacts = responseData;
      },
      error => {
        console.log(error);
      }
    );
  }
}
