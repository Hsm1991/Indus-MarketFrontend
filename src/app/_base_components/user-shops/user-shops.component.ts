import {Component, OnInit} from '@angular/core';
import {Shop} from "../../models/shop";
import {ShowShopsService} from "../../_services/show-shop.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';
import Swal from "sweetalert2";


@Component({
  selector: 'app-user-shops',
  templateUrl: './user-shops.component.html',
  styleUrls: ['./user-shops.component.scss']
})

export class UserShopsComponent implements OnInit{
  private fileToUpload: File | null = null;
  message!:string;
  created = true;
  not_created = true;
  authToken !: string;
  constructor(private shop:ShowShopsService, private http:HttpClient,private router: Router) {
  }
  public shops: Shop[]=[];
  id:any;
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  delete(){
    this.shop.deleteShop(this.id).subscribe();
    Swal.fire('Success!', 'Shop deleted successfully', 'error');

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
 getId(id:any){
    this.id=id;
 }
  ngOnInit(): void {
    this.shop.getShops().subscribe(data=>{
      this.shops=data;
      console.log(this.shops[0].localisation)
    })
  }


  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files.item(0);
  }

  onUpload(): void {
    console.log("begining upload!")
    if (!this.fileToUpload) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fileToUpload);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    console.log(this.authToken)
    if (!this.isImageFile(this.fileToUpload))
    {
      this.message = "unsupported file type!"
      this.created = false;
    }
    if (this.isImageFile(this.fileToUpload))
    {
      this.http.post("http://localhost:8085/profile/picture/update",formData, {headers}).subscribe(() => {

        this.message = "shop picture added successfully! "
        this.created=false;

        window.location.reload();
      }, error => {
        this.created=false;
        this.message = "shop picture added successfully! "
      });
    }

  }
  isImageFile(file: File): boolean {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileName = file.name.toLowerCase();
    return allowedExtensions.some(ext => fileName.endsWith(ext));
  }

  onButtonClick(id:any) {
    this.router.navigate(['/shop-details']);
  }


  openShopDetails(id: any): void {
    this.router.navigate(['shop-details/', id]);
  }

  shoPdf(shop:Shop){
    const url = 'http://localhost:4200/assets/img/'+shop.name+'.pdf';
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    } else {
      console.error('Failed to open window');
    }
  }
}

