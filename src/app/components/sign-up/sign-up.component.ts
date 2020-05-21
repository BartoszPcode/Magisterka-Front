import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/models/registerDTO';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild('f', null) signInForm: NgForm; 
  
  isUserIncorrect: boolean = false;
  registerDTO: RegisterDTO = { login: "", password: "", imie: "", nazwisko: "", albumNo: "", registerDate: null};
  registerSuccessFlag: boolean = false;
  constructor(private authService: AuthorisationService,
              private router: Router,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.registerDTO.login = this.signInForm.value.username;
    this.registerDTO.password = this.signInForm.value.password;
    this.registerDTO.imie = this.signInForm.value.imie;
    this.registerDTO.nazwisko = this.signInForm.value.nazwisko;
    this.registerDTO.albumNo = this.signInForm.value.albumNo;
    this.registerDTO.registerDate = new Date();
    
    this.authService.register(this.registerDTO).pipe().subscribe( 
      () =>{
        this.registerSuccessFlag = true;
      }, error => {
        this.isUserIncorrect = true;
        this.alertifyService.errorServerConnection();
      } );
  }

}
