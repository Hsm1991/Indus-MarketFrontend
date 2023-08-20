import { Component } from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../_services/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login-back',
  templateUrl: './login-back.component.html',
  styleUrls: ['./login-back.component.scss']
})
export class LoginBackComponent {
  created = true;
  not_created = true;
  message!: string;
  public user !: User;

  constructor(private userService:UserService, private router: Router){
    this.user = this.userService.getCurrentUser();
  }
  login(loginForm: NgForm){
    this.userService.login(loginForm.value).subscribe(
      (response)=>{

        this.message=response;

        if (this.message.startsWith('ey'))
        {
          localStorage.setItem('currentUser',this.message);

          console.warn(this.user.role)
          console.warn(this.user.phoneNumber)

          if (this.user.role.startsWith('U'))
          {
            this.message = "you are not permitted to access such area !"
            this.created=false;
            this.not_created=true;
            return;
          }
          this.router.navigate(['/back-office/dashboard']);
        }
        this.created=false;
        this.not_created=true;

      },
      (error)=>{
        console.log(error);
        this.user = this.userService.getCurrentUser();
        console.error(this.user.role)

        this.not_created=false;
        this.message=error;
        this.created=true;
      }

    );
  }


}
