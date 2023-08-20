import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {UserService} from "./user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Claims} from "../models/Claims";

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  token!:string;
  user!:User;

  constructor(private userService : UserService , private http : HttpClient) { }

  GetClaims(){
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.get<Claims[]>("http://localhost:8085/claims/claimsForUser",{headers})
      .pipe(map((res:any)=>{
        return res;
      }))
  }
}
