import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {Shop} from "../models/shop";
import {Observable} from "rxjs";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})

export class ShowShopsService {
  private shopId: number;
  averageRating = 0;

  constructor(private http : HttpClient) { }
  getShops(){
    return this.http.get<Shop[]>("http://localhost:8085/shop/findAll")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getreport(id : any , date1 : any , date2 : any){
    return this.http.get<Shop[]>("http://localhost:8085/shop/createReport?shopId="+id+"&deb="+date1+"&fin="+date2+"")
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  getCatalog(idShop : any ){
    return this.http.get<Shop[]>("http://localhost:8085/createCatalog?idShop="+idShop)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  getOneShop(id:any): any{
    const url = "http://localhost:8085/shop/findone/"+id;
    return this.http.get<Shop>(url);
  }
  deleteShop(id:any){
    return this.http.delete("http://localhost:8085/shop/delete/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  getAverageRating(id :any){
    return this.http.get<any>(`http://localhost:8085/rating/shopAverage/`+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

}
