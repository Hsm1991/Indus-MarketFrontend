import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopModuleComponent} from "./shop-module.component";
import {ShopComponent} from "./shop/shop.component";
import {ProductComponent} from "./product/product.component";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {path:"",component:ShopModuleComponent,children:[
      {path:"",component:ShopComponent},
      {path:"",redirectTo:'products',pathMatch:'full'},
      {path:"shop/:id",component:ProductComponent},
      {path:"cart",component:CartComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopModuleRoutingModule { }
