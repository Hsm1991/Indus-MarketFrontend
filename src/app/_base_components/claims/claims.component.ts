import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../_services/user.service";
import {Claims} from "../../models/Claims";
import {ClaimService} from "../../_services/claim.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss'],
  providers: [DatePipe]
})
export class ClaimsComponent implements OnInit{
 public claims:Claims[]=[];
  pageSize = 3; // Number of items to display per page
  currentPage = 1; // Current page number
  user!:User;
  constructor(private claimsService : ClaimService) {

  }
  ngOnInit(): void {
    this.claimsService.GetClaims()
      .subscribe(res=>{
        this.claims = res;
        console.log(this.claims)
      })

  }
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  public selectedMedia: any; // Store the selected media object
  public isImageModalOpen: boolean = false; // Track if the image modal is open

  // Handle image click event
  public onImageClick(media: any): void {
    this.selectedMedia = media; // Store the selected media object
    this.isImageModalOpen = true; // Open the image modal
  }

  // Close the image modal
  public closeImageModal(): void {
    this.isImageModalOpen = false; // Close the image modal
    this.selectedMedia = null; // Clear the selected media object
  }
  showText: boolean = false; // Define a boolean flag to control the visibility of the "Show" text


}
