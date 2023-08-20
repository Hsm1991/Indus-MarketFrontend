import {Category} from "./enumerations/Category";
import {Media} from "./media";
import {Shop} from "./shop";
import {Stock} from "./stock";

export class Product{
  idProduct!:number;
  reference!:string;
  name!:string;
  quantity!:number;
  price!:number;
  description!:string;
  discount!:number;
  PriceAfterDiscount!:number;
  brand!:string;
  category!:Category;
  barcodeImage!:Media;
  medias!:Media[];
  status!:string;
  validated: boolean;
  shop:Shop;
stock:Stock}
