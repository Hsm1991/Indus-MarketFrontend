import {Component, Input, OnInit} from '@angular/core';
import { ShowShopsService } from 'src/app/_services/show-shop.service';
import {Shop} from 'src/app/models/shop';
import {HttpClient} from "@angular/common/http";
import {Rating} from "../../../models/rating";



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public shopList:Shop[]=[];
  p:number = 1;
  itemsPerPage:number =3;
  totalShop:any;
  selectedIndex =0;
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;
  public indexImage:object={};
  averageRating :any;



  ff : Number = 0
  constructor(private api:ShowShopsService , private http: HttpClient){}
 public ranking : object={};

  ngOnInit():void{
    this.api.getShops()
      .subscribe(res=>{

        this.shopList = res;
        for(let shop of this.shopList){
          this.ranking[shop.idShop] = 4

          this.api.getAverageRating(shop.idShop).subscribe(data =>{
            this.ranking[shop.idShop] = Math.round( data)
          })
          this.indexImage[shop.idShop]=0;
        }
        console.log(this.ranking)
        console.log(this.indexImage)
        console.log(this.shopList)
        this.totalShop=res.length;
      })


  }
  getRating(id:any){
     this.api.getAverageRating(1).subscribe(data =>{
       this.ff = Math.round( data)
    })
  }
  selectImage(idImage:number,index: number):void{

    this.indexImage[idImage]=index;
  }
  getMedia(){
   for (let item of this.shopList){
     return item.medias;
    }
   return [];
  }
  onPrevClick(idImage: number,longeur:number):void{
    if(this.indexImage[idImage]===0){
    }else {
      this.indexImage[idImage]--;
    }
  }
  onNextClick(idImage:number,longeur:number ):void{
    if(this.indexImage[idImage] === longeur -1){
      this.indexImage[idImage] = 0;
    }else{
      this.indexImage[idImage]++;
    }
  }




}
