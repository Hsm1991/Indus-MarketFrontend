import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ShowProductsShopService} from "../../_services/show-products-shop.service";
import {UserService} from "../../_services/user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent implements OnInit{
  constructor(private product:ShowProductsShopService,private userService:UserService, private http: HttpClient,
              private router : Router) {
  }
  public products: Product[]=[];
  selectedProductId !: number;
  id:any;
  files: FileList;
  selectedProduct : Product = new Product();
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  user: number;
  selectedIndex =0;
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;
  public indexImage:object={};

  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  delete(){
    this.product.deleteProduct(this.id).subscribe();
    Swal.fire('Success!', 'Your product has been deleted successfully', 'error');

    setTimeout(() => {
      window.location.reload();
    }, 2000);

  }
  getId(id:any){
    this.id=id;
  }

  ngOnInit(): void {
    this.user=this.userService.getCurrentUser().id;
    this.product.getProd(this.user).subscribe(data =>{
        this.products=data
        console.log(data)
        for (let product of this.products){
          this.indexImage[product.idProduct] = 0;}
      }
    )

  }

  selectImage(idImage:number,index: number):void{
    this.indexImage[idImage]=index;
  }

  onPrevClick(idImage: number,longeur:number):void{
    if(this.indexImage[idImage]===0){
    }else {
      this.indexImage[idImage]--;
    }
  }
  selectProductId(product : any)
  {
    this.selectedProductId = product;
    console.error(this.selectedProductId)
    this.loadProduct();

  }
  loadProduct ()
  {
    this.product.findProduct(this.selectedProductId).subscribe((res)=>
    {


      this.selectedProduct.idProduct = res.idProduct;
      this.selectedProduct.category = res.category;
      this.selectedProduct.description = res.description;
      this.selectedProduct.price = res.price;
      this.selectedProduct.name = res.name;
      this.selectedProduct.PriceAfterDiscount = res.PriceAfterDiscount;
      this.selectedProduct.stock = res.stock;
      this.selectedProduct.status = res.status;
      this.selectedProduct.medias = res.medias;
      this.selectedProduct.validated = res.validated;
      this.selectedProduct.discount = res.discount;
      this.selectedProduct.quantity = res.quantity;
      this.selectedProduct.reference = res.reference;
      this.selectedProduct.brand = res.brand;
      this.selectedProduct.barcodeImage = res.barcodeImage;
      this.selectedProduct.shop = res.shop;
      console.warn(this.selectedProduct)
    })
  }
  submitProduct(product: Product){
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    // @ts-ignore
    formData.append('idProduct', product.idProduct);
    formData.append('brand', product.brand);
    formData.append('description', product.description);
    // @ts-ignore
    // @ts-ignore
    formData.append('shopId', product.shop.idShop);
    // @ts-ignore
    formData.append('quantity', product.stock.currentQuantity);
    // @ts-ignore
    formData.append('price', product.price);
    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        formData.append('file', this.files[i]);
      }
    }

    const token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://localhost:8085/product/add', formData, {headers : headers }).subscribe(
      (res)=>
      {
        console.log(res)
      },
      error => {
        console.error(error)
      }
    )
    this.product.getProd(this.user).subscribe(data=>{this.products=data
      for (let product of this.products){
        this.indexImage[product.idProduct] = 0;}}
    )
    window.location.reload()
  }
  onFileSelected(event): void {
    this.files = event.target.files;
  }
  onNextClick(idImage:number,longeur:number ):void{
    if(this.indexImage[idImage] === longeur -1){
      this.indexImage[idImage] = 0;
    }else{
      this.indexImage[idImage]++;
    }
  }



  onSubmit(form: NgForm) {
    console.log(form);
    // Vérifier si le formulaire est valide
    if (form.invalid) {
      return;
    }
    // Soumettre les données du formulaire au serveur
    console.log(this.selectedProduct);
    // Réinitialiser le formulaire
    form.reset();
  }

  isString(val: any): boolean { return typeof val === 'string'; }
  isNumber(val: any): boolean { return typeof val === 'number'; }


}
