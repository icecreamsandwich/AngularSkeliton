import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddcontactComponent } from './components/addcontact/addcontact.component';
import { ListcontactsComponent } from './components/listcontacts/listcontacts.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddressformatterPipe } from './_pipes/addressformatter.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ChangefontfamilyDirective } from './_directives/changefontfamily.directive';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { AsyncobervabletimeComponent } from './components/asyncobervabletime/asyncobervabletime.component';
import { HomechildComponent } from './components/homechild/homechild.component';
import { PhonevalidatorDirective } from './_directives/phonevalidator.directive';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewprofileComponent } from './components/viewprofile/viewprofile.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    AddcontactComponent,
    ListcontactsComponent,
    LoginComponent,
    HomeComponent,
    AddressformatterPipe,
    ChangefontfamilyDirective,
    LoaderComponent,
    AsyncobervabletimeComponent,
    HomechildComponent,
    PhonevalidatorDirective,
    ResetpasswordComponent,
    SignupComponent,
    ViewprofileComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
