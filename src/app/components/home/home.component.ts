import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = 'Hi child';
  GreetMessage = 'css and php[server] too';
  subjectValue: any
  fromChildData : string
  toChildData : string
  contactDetailsObs : any
  authenticatedUserDetails : any

  constructor(private authService: AuthService) { 
    /* this.contactDetailsObs = this.authService.getContactDetails();
    this.authenticatedUserDetails = this.authService.getUserDetails() */
  }

  ngOnInit(): void {
    this.getUserTokenDetails()
  }

  getUserTokenDetails() {
    /*   this.subjectValue = new Observable<string>((observer: Observer<string>) => {
        let data = {
          username: "admin",
          password: "Admin3201$#$"
        }
        setInterval(() => {
          //random string
          // let randStr = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
          this.authService.signIn(data).subscribe(res => {
            const result = JSON.parse(JSON.stringify(res))
            observer.next(result)
          },
            error => {
              console.log(error)
              observer.next(error)
            })
        }, 10000);
      }) */
  }

  recieveDataFromChild(event){
    this.fromChildData = event
  }

  sendDataToChild(){
    this.toChildData = "Hello Child"
  }

  fetchLatestDetails(){
    //this.contactDetailsObs = this.authService.getContactDetails();
  }
}
