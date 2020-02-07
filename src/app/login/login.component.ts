import { Component, OnInit } from '@angular/core';    
import { Router } from '@angular/router';    
import { AuthenticationService } from '../services/authentication.service';    
@Component({    
  selector: 'app-login',    
  templateUrl: './login.component.html',    
  styleUrls: ['./login.component.scss']    
})    
export class LoginComponent implements OnInit {    
  username: string = '';
  password: string = '';    
  errorMessage:string;    
  constructor(private router:Router,private authenticationService: AuthenticationService) { }    
  ngOnInit() {    
    this.authenticationService.logout();
    sessionStorage.removeItem('UserName');    
    sessionStorage.clear();    
  }
      
  login(){      
    const _this = this;
    this.authenticationService.login(_this.username, _this.password).subscribe(    
      data => {     
        if(data.Status=="Success")    
        {       
          _this.router.navigate(['/dashboard']);    
        }    
        else{    
          _this.errorMessage = data.Message;    
        }    
      },    
      error => {    
        _this.errorMessage = error.message;    
      });    
  };    
 }