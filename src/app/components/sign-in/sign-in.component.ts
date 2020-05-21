import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { SignIn } from 'src/app/models/signIn';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @ViewChild('f', null) signInForm: NgForm; 

  isUserIncorrect: boolean = false;
  signIn: SignIn = { login: "", password: ""};
  response: any;
  


  constructor(private authService: AuthorisationService,
              private router: Router,
              private alertifyService: AlertifyService) { 
        if (this.authService.currentUserValue) {
          this.router.navigate(['/home']);
      }
  }

  ngOnInit() {}

  onSubmit() {
    this.signIn.login = this.signInForm.value.username;
    this.signIn.password = this.signInForm.value.password;
    this.authService.login(this.signIn)
        .subscribe(
            data => {
              this.alertifyService.success("Zalogowano");         
                this.router.navigate(['/home']);
                console.log(data);
            },
            error => {
              this.alertifyService.errorServerConnection();
              this.isUserIncorrect = true;
            });
}

}
