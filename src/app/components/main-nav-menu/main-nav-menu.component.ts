import { Component, OnChanges, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { User } from 'src/app/models/user';
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-main-nav-menu',
  templateUrl: './main-nav-menu.component.html',
  styleUrls: ['./main-nav-menu.component.css']
})
export class MainNavMenuComponent  {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    currentUser: User;
    jwtHelper = new JwtHelperService();

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthorisationService) 
  {
    this.authService.currentUser.subscribe(x => this.currentUser = x );
  }

  
  logout(){
    this.authService.logout();
  }

  readRole(): string{
    if(this.currentUser != null){
      return this.jwtHelper.decodeToken(this.currentUser.token).role;
    }
  }
}
