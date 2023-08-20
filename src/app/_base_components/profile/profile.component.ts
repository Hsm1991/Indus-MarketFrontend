import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../_services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Shop} from "../../models/shop";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Product} from "../../models/product";
import {UserProductsComponent} from "../user-products/user-products.component";
import * as tt from "@tomtom-international/web-sdk-maps";
import {MapService} from "../../_services/map.service";
import {localisation} from "../../models/Localisation";
import Swal from "sweetalert2";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe],

})
export class ProfileComponent implements OnInit,AfterViewInit{
  prod : Product[]=[];
  shop : Shop = new Shop();
  user!: User;

  //map
  longitude:number ;
  latitude:number ;
  map : tt.Map;
  //map
  constructor(private http:HttpClient,private userService: UserService, private router: Router,
              private fb: FormBuilder,
              private mapService:MapService) {
  }

  ngAfterViewInit(): void {
    this.map = tt.map({
      key: this.mapService.key,
      container: 'map',
    });
    this.mapService.centerMapAroundLocation(this.map);
    this.map.on('click', this.handleMapClick.bind(this));
    }
  public  redirect(root:any){
    this.router.navigate([root]);
  }
  loading = true;

  private fileToUpload: File | null = null;
  //TODO add condition for empty file on upload
  private shopFiles: File[]  = [];
  files : FileList;
  addShopForm: FormGroup;

  message!:string;
  created = true;
  not_created = true;
  authToken !: string;
  phoneNumber : string =''
  adresse : string =''
@ViewChild(UserProductsComponent) prodd !: UserProductsComponent;
  ngOnInit(): void {
    this.addShopForm = this.fb.group({
      name: '',
      mail: '',
      adresse: '',
      phoneNumber: '',
    });


    if(localStorage.getItem('currentUser')===null)
    {
      this.router.navigate(['/login'])
    }
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.authToken = localStorage.getItem("currentUser")
    console.log(this.user)
  }

  onFileSelected(event: any): void {
    console.log(event.target.files)
    this.fileToUpload = event.target.files.items
  }
  getLatLng(event){
    console.log('we are in parent component');
    console.log(event);
  //  this.latLng = event;
  }
  uploadFiles():void
  {
    console.log("begining upload!")
    if (!this.shopFiles) {
      return;
    }

    const formData = new FormData();
    // @ts-ignore
    formData.append('file', this.shopFiles);
    formData.append("adresse"
      , new Blob([JSON.stringify(this.adresse)], {type:"application/json"}));
    formData.append('name', this.shop.name)
    formData.append('mail', this.shop.mail)
    formData.append('phoneNumber', this.phoneNumber)
    formData.append('adresse', this.shop.adresse)

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    console.log(this.authToken)
    console.log(this.shopFiles)
    for (let file of this.shopFiles)
    {
      if (!this.isImageFile(file))
      {
        this.message = "unsupported file type!"
        this.created = false;
      }
    }



      this.http.post("http://localhost:8085/shop/add",formData, {headers}).subscribe(() => {

        this.message = "shop picture added successfully! "
        this.created=false;

        window.location.reload();
      }, error => {
        this.created=false;
        this.message = "shop picture added successfully! "
      });
    }



  onFilesSelected(event: any): void {
    console.log("files",event.target.files)
    this.files = event.target.files//.items//(0);
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

        this.loading = true;
        this.message = "profile picture added successfully! "
        this.created=false;

        window.location.reload();
      }, error => {
        this.loading = true;
        this.created=false;
        this.message = "profile picture added successfully! "
      });
    }

  }
  isImageFile(file: File): boolean {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileName = file.name.toLowerCase();
    return allowedExtensions.some(ext => fileName.endsWith(ext));
  }
  addShop() {
    const lat = this.latitude;
    const lng = this.longitude;

    const shop : Shop = this.addShopForm.value;
    console.log('shop to add')
    console.log(shop)

    const formData = new FormData();

    // Ajouter les données du formulaire dans l'objet FormData
    formData.append('name', shop.name);
    formData.append('mail', shop.mail);

    const adr:JSON = <JSON><unknown>{
      "adresse": "cite elghazela ariana",
    }
    console.warn(JSON.stringify(adr))
    // @ts-ignore
    // formData.append("adresse"
    //   , shop.adresse);

    formData.append('phoneNumber', shop.phoneNumber.toString() );

    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        formData.append('file', this.files[i]);
      }
    }

    const token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:8085/shop/add?longitude='+lng+'&latitude='+lat, formData, { headers: headers }).subscribe(
      (response) => {
        console.log(localisation)
        console.log(response)
        Swal.fire('Success!', 'Shop added successfully!', 'success');

        setTimeout(() => {
          window.location.reload();
        }, 5000);
      },
      (error) => {
        console.error(error)
      }
    )


  }

  handleMapClick(event: any) {
    const lngLat = event.lngLat;
    this.longitude = lngLat.lng;
    this.latitude = lngLat.lat;
    this.mapService.setMarker(this.longitude,this.latitude,this.map);
  }


}
