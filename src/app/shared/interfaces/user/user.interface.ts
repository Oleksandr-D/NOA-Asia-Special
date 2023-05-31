export interface IUserRequest {
   firstName:string,
   lastName: string,
   phoneNumber:string,
   email:string,
}

export interface IUserResponse extends IUserRequest {
   id:string;
}
