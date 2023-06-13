import { ICategoryResponse } from "../category/category.interface";

export interface IProductRequest {
   name:string;
   path:string;
   description:string;
   weight:string;
   price:number;
   imagePath:string;
   category:ICategoryResponse;
   count:number;
   culinasia:false;
   rice:false;
   veggie:false;
   addIngredients:false;
   cutrely?:number;
   favorites?: boolean;
}
export interface IProductResponse extends IProductRequest {
   id:number | string;
}
