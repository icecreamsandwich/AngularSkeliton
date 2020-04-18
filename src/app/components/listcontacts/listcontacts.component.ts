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
    const list: string [] = [];
    this.contactService.findByName(data).subscribe(
      response => {
        const responseData = JSON.parse(JSON.stringify(response)).data;
        list.push(responseData);
        console.log(list);
        if (responseData){
          this.contacts = list;
        }else{
          this.contacts = '';
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
