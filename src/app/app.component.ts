import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthorisationService } from './services/authorisation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JavaCourseFront';
  currentUser: User;
  
  constructor(private authorisationService: AuthorisationService){
    this.authorisationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authorisationService.logout();
    //this.router.navigate(['/login']);
}
}
