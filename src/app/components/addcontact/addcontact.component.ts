import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from "../../_services/contact-service.service";

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {
  contact = {
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: ''
  }
  submitted = false
  constructor(private contactService: ContactServiceService) { }

  ngOnInit(): void {
  
  }

  saveContact() {
    console.log("in function")
    const data = {
      firstname: this.contact.firstname,
      lastname: this.contact.lastname,
      email: this.contact.email,
      address: this.contact.address,
      phone: this.contact.phone
    }
    console.log(data)
    this.contactService.create(data).subscribe(
      response => {
        console.log(response);
        console.log("contact added successfully");
        this.submitted = true;
      },
      error => {
        console.log(error)
      }
    )
  }

  newContact() {
    this.contact = {
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      phone: ''
    }
    this.submitted = false
  }

}
