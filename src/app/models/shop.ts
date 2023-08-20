import {Media} from "./media";
import {localisation} from "./Localisation";

export class Shop{
  idShop!:number;
  name!:string;
  mail!:string;
  phoneNumber!:number;
  isValidated!:boolean;
  adresse!:string;
  medias!:Media[];
  localisation !: localisation;
}
