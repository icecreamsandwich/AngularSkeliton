import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from "../../_services/contact-service.service";
import { element } from 'protractor';

@Component({
  selector: 'app-listcontacts',
  templateUrl: './listcontacts.component.html',
  styleUrls: ['./listcontacts.component.css']
})
export class ListcontactsComponent implements OnInit {

  contacts : any;
  username : ''
  //dependancy Injection
  constructor(private contactService : ContactServiceService) { }

  ngOnInit(): void {
    this.getAllContacts()
  }

  getAllContacts(){
    this.contactService.getAll().subscribe(
      response =>{
        console.log(response);
        this.contacts = JSON.parse(JSON.stringify(response)).data
      },
      error =>{
        console.log(error)
      }
    )
  }

  editContact(){

  }

  searchContact(){
    const data = {
      username : this.username
    }
    let list :   String [] = []
    this.contactService.findByName(data).subscribe(
      response => {
        list.push(JSON.parse(JSON.stringify(response)).data)
        console.log(list)
        if(list.length > 0){
          this.contacts = list
        }else{
          this.contacts = list
        }
      },
      error =>{
        console.log(error);
      }
    )
  }
}
