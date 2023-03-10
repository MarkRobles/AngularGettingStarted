import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy{
   
  constructor(private productService:ProductService){}
    pageTitle = 'Product List';
    imageWidth:number =50; //You cand add or not the type. Angular infer the type
    imageMargin = 2;
    showImage: boolean = false;
    errorMesagge:string='';
    sub!:Subscription;
    
   private _listFilter: string = '';

   get listFilter(): string{

    return this._listFilter;
   }

   set listFilter(value:string)
   {
       this._listFilter= value;
       console.log('In setter:',value);
       this.filteredProducts = this.performFilter(value);
   }
filteredProducts:IProduct[] = [];
    products: IProduct[] = [];

      performFilter(filterBy:string):IProduct[]{

        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product:IProduct)=>
        product.productName.toLocaleLowerCase().includes(filterBy));
      }
      toggleImage(): void{
          this.showImage = !this.showImage;
      }
      ngOnInit(): void {
        this.sub= this.productService.getProducts().subscribe(
          {
            next: products=>
            {
              this.products = products;
              this.filteredProducts = this.products; 
            } ,
            
      
            error: err=> this.errorMesagge = err
          }
        );
      
    }

    ngOnDestroy():void{
this.sub.unsubscribe();

    }
    onRatingClicked(message:string):void{
      this.pageTitle = 'Product List: '+ message;
    }
}