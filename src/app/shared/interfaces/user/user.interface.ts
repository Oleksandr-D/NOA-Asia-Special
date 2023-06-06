import { IProductResponse } from "../product/product.interface";

export interface IUserRequest {
   firstName:string,
   lastName: string,
   phoneNumber:string,
   email:string,
   address:string,
   street:string,
   house: string,
   flat:string,
   entrance:string,
   floor:string,
   intercom:string,
   orders: IProductResponse[];
   addresses:any[];
}

export interface IUserResponse extends IUserRequest {
   id:string;
}
