import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopModuleRoutingModule } from './shop-module-routing.module';
import { ProductComponent } from './product/product.component';
import { Header1Component } from './header1/header1.component';
import { CartComponent } from './cart/cart.component';
import {NgxPaginationModule} from "ngx-pagination";
import { SearchFilterComponent } from './search-filter/search-filter.component';
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        ProductComponent,
        Header1Component,
        CartComponent,
        SearchFilterComponent
    ],
  exports: [
    Header1Component,
    ProductComponent
  ],
    imports: [
        CommonModule,
        ShopModuleRoutingModule,
        NgxPaginationModule,
        MatSliderModule,
        FormsModule,
    ]
})
export class ShopModuleModule { }
