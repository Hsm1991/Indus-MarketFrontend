import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {ShowShopsService} from "./show-shop.service";
import {Shop} from "../models/shop";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../models/product";
import {Rating} from "../models/rating";

@Injectable({
  providedIn: 'root'
})
export class ShowProductsShopService {
  public search = new BehaviorSubject<any>([]);
  private shopId: number;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json','Authorization':""})
  }


  constructor(private http : HttpClient) { }

  getProduct(id:any): Observable<Product[]>{
    const url = "http://localhost:8085/shop/findAllProducts/"+id;
    return this.http.get<Product[]>(url);
  }

  findall(){
    const url = "http://localhost:8085/product/findAll";
    return   this.http.get<Product[]>(url);
  }
  getProd(id:any){

    return this.http.get<any[]>("http://localhost:8085/product/ShowAllProductsForUser/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  changeStatus(id : any){
    return   this.http.post<any>("http://localhost:8085/product/chageStat/"+id , null)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  addRating(shopId,rateValue){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem("currentUser")
      })
    }
    const url = "http://localhost:8085/rating/add/"+shopId+"/"+rateValue;
    return this.http.post<Rating>(url, {},this.httpOptions);
  }

  deleteProduct(id:any){
    return this.http.delete("http://localhost:8085/product/delete/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  showParCateg(cat:any){
    return this.http.get<Product[]>("http://localhost:8085/product/sortByCategory?category="+cat)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  showParPrice(min:any,max:any){
    return this.http.get<Product[]>("http://localhost:8085/product/findByMaxAndMinPrice?min="+min+"&max="+max)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  compare(id1:any,id2:any){
    return this.http.get<Product[]>("http://localhost:8085/product/compare?productId1="+id1+"&productId2="+id2)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getDiscounted(){
    return this.http.get<Product[]>("http://localhost:8085/product/findByDiscount")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  updateQuantity(id:any,qte: any): Observable<any> {
    const authToken = localStorage.getItem('currentUser')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    const url = ("http://localhost:8085/product/updateQuantity?id="+id+"&qte="+qte)
    return this.http.post<any>(url, {},{headers:headers});
  }

  addDiscount(id:any,discount: any): Observable<any> {
    const authToken = localStorage.getItem('currentUser')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    const url = ("http://localhost:8085/product/addDiscount?Discount="+discount+"&idProd="+id)
    return this.http.post<any>(url, {},{headers:headers});
  }
  showMostSold(){


    return this.http.get<Product[]>("http://localhost:8085/product/mostSoldFirst")
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  showSearchedFirst(){
    return this.http.get<Product[]>("http://localhost:8085/product/showProductsToSpeceficUser")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getRatingByUser(id :any){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem("currentUser")
      })
    }
    return this.http.get<any>(`http://localhost:8085/rating/getRatingByUser/`+id,this.httpOptions)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  public findProduct(id: any):Observable<Product>
  {
    const token = localStorage.getItem('currentUser')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product>('http://localhost:8085/product/findByid?id='+id,{ headers : headers})
  }
}
