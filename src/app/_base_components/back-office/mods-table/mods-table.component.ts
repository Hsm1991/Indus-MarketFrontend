import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../_services/user.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-mods-table',
  templateUrl: './mods-table.component.html',
  styleUrls: ['./mods-table.component.scss']
})
export class ModsTableComponent implements OnInit{
  email!: string;
  modEmail!: string;
  public users: User[]=[];
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  user !: User;
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  constructor(private userService: UserService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.userService.getAllMods().subscribe(res =>{
      this.users=res
      console.log(this.users)

    })
  }
  getUserEmail(email: string)
  {
    this.email=email;
    console.log(this.email)
  }
  onSubmit()
  {
      this.httpClient.get("http://localhost:8085/admin/addMod?email="+this.modEmail, { responseType: 'text' })
        .subscribe(res =>
        {
          console.log(res)
        })
  }
  banUser(email: string){
    this.httpClient.get("http://localhost:8085/admin/ban?email="+email, { responseType: 'text' }).subscribe(
      res =>
      {
        console.log(res)
        window.location.reload();
      }
    )
  }
}
