import {Component, Input, OnInit} from '@angular/core';
import {ShowShopsService} from "../../../_services/show-shop.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ShowProductsShopService} from "../../../_services/show-products-shop.service";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {Product} from "../../../models/product";
import {Shop} from "../../../models/shop";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-prod',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public productList: Product[] = [];
  public shopList: Shop[] = [];
  searchTerm:string='';
  allProducts : Product[] = [];
  products : Product[] = [];
  error: boolean = false;
  p: number = 1;
  itemsPerPage: number = 12;
  totalShop: any;
  selectedIndex = 0;
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;
  public indexImage: object = {};

  @Input() product: Product;



 
  constructor(private ac:ActivatedRoute,private api:ShowProductsShopService,private api1:ShowShopsService){
    

  }
  routeSub: Subscription;
  id: any;
  messageSuccess: string = "";
  discount: Product[];
   noUiSlider: any;

   myRating:number=0;
  ngOnInit(): void {

    this.routeSub = this.ac.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.api.getRatingByUser(this.id).subscribe((data)=>{
        this.myRating = data
      })
    });

    this.api.getProduct(this.id)
      .subscribe(res => {
        this.productList = res;
        this.allProducts = res;
        for (let shop of this.productList) {
          this.indexImage[shop.idProduct] = 0;
        }
        console.log(this.productList)
      })
  }

  selectImage(idImage: number, index: number): void {
    this.indexImage[idImage] = index;
  }
  divCom : boolean = false
  show(){
    this.divCom = ! this.divCom
  }
  prr1 : Product = new Product()
  prr2: Product = new Product()
msg1 : string = ""
  msg2 : string = ""

  OnCompare(){
    this.api.compare(this.prr1,this.prr2).subscribe(data =>{
      console.log(data)
      this.msg1=data[0];
      this.msg2=data[1]
    })
    console.log(this.prr1)
    console.log(this.prr2)
  }
  onPrevClick(idImage: number, longeur: number): void {
    if (this.indexImage[idImage] === 0) {
    } else {
      this.indexImage[idImage]--;
    }
  }

  onNextClick(idImage: number, longeur: number): void {
    if (this.indexImage[idImage] === longeur - 1) {
      this.indexImage[idImage] = 0;
    } else {
      this.indexImage[idImage]++;
    }
  }


  addRating(rateValue) {
    console.log(rateValue);
    this.messageSuccess = "Shop Rated Successfully";
    this.api.addRating(this.id, rateValue).subscribe((data) => {

      setTimeout(() => {
        this.messageSuccess = ""
      }, 3000)
      console.log(data)
    })
  }

  confirm() {
    this.api.getDiscounted().subscribe(data => {
      this.discount = data
      this.productList = data
      console.log(data)
    })


  }

  allProd(id1:any){
    this.api.getProd(id1).subscribe(data =>{
      this.productList=data
      console.log(data)
    })
  }

  cat: any
divShow : boolean=false
  showdiv(){
    this.divShow = !this.divShow
  }
  sortByCatg() {
    this.api.showParCateg(this.cat).subscribe(data => {
      this.productList = data
      console.log(data)
      this.divShow = false;
    })
  }
  max: any
  min:any
  divShow1 : boolean=false

  showdiv1(){
    this.divShow1 = !this.divShow1
  }
  isNotANumber(value: any): boolean {
    return isNaN(value);
  }
  sortByprix() {
    this.error=false;
    if (this.isNotANumber(this.min) || this.isNotANumber(this.max)) {
      this.error = true;
      return;
    }
    this.api.showParPrice(this.min,this.max).subscribe(data => {
      this.productList = data
      console.log(data)
      this.divShow1 = false;

    })
  }

  mostSold() {
    this.api.showMostSold().subscribe(data => {
      this.discount = data
      this.productList = data
      console.log(data)
    })
  }

  search(event:any){

    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    console.log(this.searchTerm);
    this.productList = this.filteredProducts(this.searchTerm)
    console.log(this.products)
  }

  filteredProducts(typedText){
    let filtered = ["description","price","brand","category","name"]
    if (typedText.length==0){
      return [...this.allProducts]
    }
    let result = []
    for(let product of [...this.allProducts]){
      for(let filter of filtered){
        if (typeof(product[filter]) == "string"){
          if(product[filter].toLowerCase().includes(typedText)){
            result.push(product)
          }
        }else{
          if (product[filter]== Number(typedText)){
            result.push(product)
          }
        }

      }
    }
    return result;

  }

  searchedFirst() {
    this.api.showSearchedFirst().subscribe(data => {
      this.discount = data
      this.productList = data
      console.log(data)
    })


  }

}
