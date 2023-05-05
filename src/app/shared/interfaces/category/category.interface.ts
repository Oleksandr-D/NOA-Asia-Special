export interface ICategoryRequest {
   name: string;
   path: string;
   imagePath: string;
   thai?:boolean;
}

export interface ICategoryResponse extends ICategoryRequest {
   id: number | string;
}
