import {Component, Input, OnInit} from '@angular/core';
import {Shop} from "../../models/shop";
import {ActivatedRoute, Params} from "@angular/router";
import {delay, delayWhen, Subscription} from "rxjs";
import {ShowShopsService} from "../../_services/show-shop.service";
import {ShowProductsShopService} from "../../_services/show-products-shop.service";
import {Product} from "../../models/product";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit{
  constructor(private http : HttpClient,private activatedRoute: ActivatedRoute ,private Shopservice : ShowShopsService ,private prductService : ShowProductsShopService) {

  }
  public productList: Product[] = [];
  prop ='';
  discount:any
  qte:any
  divShow2:boolean=false

  divShow3:boolean=false
  searchTerm:string='';
  searchKey:string='';
  averageRating:any
  x : boolean = false
  date1:any
  date2:any
  product : Product = new Product();
  files !: FileList
  products : Product[] = [];
  allProducts : Product[] = []
  shopDetail : Shop = new Shop();
  routeSub: Subscription;
  shopid : any;
  public shopList:Shop[]=[];
  p:number = 1;
  itemsPerPage:number =3;
  totalShop:any;
  selectedIndex =0;
  id:any;
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;
   indexImage:any=0;
  public indexImageP:object={};

  selectImage(idImage:number,index: number):void{

    this.indexImage=index;
  }
  getMedia(){
    for (let item of this.shopList){
      return item.medias;
    }
    return [];
  }
  onFileSelected(event): void {
    this.files = event.target.files;
  }

  submitProduct(product: Product){
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    // @ts-ignore

    formData.append('brand', product.brand);
    formData.append('description', product.description);
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    formData.append('shopId', this.shopid);
    // @ts-ignore
    formData.append('quantity', product.quantity);
    // @ts-ignore
    formData.append('price', product.price);
    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        formData.append('file', this.files[i]);
      }
    }

    const token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:8085/product/add', formData, {headers : headers }).subscribe(
      (res)=>
      {
        Swal.fire('Success!', 'Product updated successfully!', 'success');
        console.log(res)
      },
      error => {
        console.error(error)
      }
    )
  }
  onPrevClick(idImage: number,longeur:number):void{
    if(this.indexImage===0){
    }else {
      this.indexImage--;
    }
  }
  onNextClick(idImage:number,longeur:number ):void {
    if (this.indexImage === longeur - 1) {
      this.indexImage = 0;
    } else {
      this.indexImage++;
    }
  }
  ff:number;
  ngOnInit(): void {
    this.Shopservice.getAverageRating(1).subscribe(data =>{
      this.ff = Math.round( data)
    })
    this.prductService.search.subscribe((val)=>{
      this.searchKey=val;
    })

    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.shopid = params['id'];});
    console.log(this.shopid)
    this.prductService.getProduct(this.shopid)
      .subscribe((res)=>{
        this.products = res;
        this.allProducts = res;
        console.log(res)
        for(let shop of this.products){

          this.indexImageP[shop.idProduct]=0;
        }
     this.Shopservice.getOneShop(this.shopid).subscribe((data) => {
       this.shopDetail = data
       console.log(data)
     })
    this.indexImage[this.shopDetail.idShop]=0;
  })





  }


  selectImageP(idImage:number,index: number):void{
    this.indexImageP[idImage]=index;
  }

  onPrevClickP(idImage: number,longeur:number):void{
    if(this.indexImageP[idImage]===0){
    }else {
      this.indexImageP[idImage]--;
    }
  }
  onNextClickP(idImage:number,longeur:number ):void{
    if(this.indexImageP[idImage] === longeur -1){
      this.indexImageP[idImage] = 0;
    }else{
      this.indexImageP[idImage]++;
    }
  }

confirme(){
  this.Shopservice.getreport(this.shopid,this.date1,this.date2).subscribe();
  Swal.fire('Success!', 'Shop report created successfully!', 'success');
  setTimeout(() => {
    window.location.reload();
  }, 5000);  }

  open(){
    this.x = ! this.x
  }
  search(event:any){

    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    console.log(this.searchTerm);
    this.products = this.filterProducts(this.searchTerm)
  }

    filterProducts(typedText){
    let filtredItems = ["description","price","brand","category","name"]
      if (typedText.length==0){
        return [...this.allProducts]
      }
      let result = []
      for(let product of [...this.allProducts]){
        for(let filter of filtredItems){
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

  updateQte() {

    this.prductService.updateQuantity(this.id,this.qte).subscribe()
    Swal.fire('Success!', 'Product quantity updated successfully!', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 5000);

  }
  addDisc(){
    this.prductService.addDiscount(this.id,this.discount).subscribe()
    Swal.fire('Success!', 'Product discount applicated successfully!', 'success');
}
  showdiv2(id:any){
    this.id=id;
    this.divShow2 = !this.divShow2
  }
  showdiv3(id:any){
    this.id=id;
    this.divShow3 = !this.divShow3
  }
  hideDiv2() {
    this.divShow2 = false;
  }
  hideDiv3() {
    this.divShow3 = false;
  }







}
