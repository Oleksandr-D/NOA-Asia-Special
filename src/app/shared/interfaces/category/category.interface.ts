export interface ICategoryRequest {
   name: string;
   path: string;
   imagePath: string;
}

export interface ICategoryResponse extends ICategoryRequest {
   id: number | string;
}
